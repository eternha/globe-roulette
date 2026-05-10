import { useReducer, useCallback, useEffect, useRef } from "react";
import type { MachinePhase, Destination } from "../data/types";
import { rouletteStore } from "../stores/rouletteStore";
import { selectRandomDestination } from "../lib/selectDestination";
import { lngToGlobeRotationY } from "../lib/geo";

/* ── Configuration ───────────────────────────────────────── */

/** Minimum pull strength required to trigger a launch */
const MIN_LAUNCH_STRENGTH = 0.15;

/** Delay before auto-transitioning impact → landed (ms) */
const IMPACT_HOLD_MS = 800;

/** Total launch animation duration (ms) — slower for visible projectile */
export const LAUNCH_DURATION_MS = 2200;

/** Extra full revolutions added during launch for dramatic spin */
const DRAMATIC_SPIN_REVOLUTIONS = 2;

/* ── Events ──────────────────────────────────────────────── */

export type RouletteEvent =
  | { type: "START_PULL" }
  | { type: "UPDATE_PULL"; pullStrength: number; offsetY: number }
  | { type: "RELEASE" }
  | { type: "LAUNCH_COMPLETE" }
  | { type: "IMPACT_COMPLETE" }
  | { type: "REVEAL" }
  | { type: "RESET" };

/* ── State ───────────────────────────────────────────────── */

export interface RouletteState {
  readonly phase: MachinePhase;
  readonly pullStrength: number;
  readonly offsetY: number;
  readonly selectedDestination: Destination | null;
  readonly lastPullStrength: number;
}

const INITIAL_STATE: RouletteState = {
  phase: "idle",
  pullStrength: 0,
  offsetY: 0,
  selectedDestination: null,
  lastPullStrength: 0,
};

/* ── Transition table ────────────────────────────────────── *
 *
 *  ┌──────────┐  START_PULL   ┌──────────┐
 *  │   idle   │─────────────▶│ pulling  │
 *  └────┬─────┘               └────┬─────┘
 *       ▲                    RELEASE│ (strength < min → idle)
 *  RESET│                         ▼
 *  ┌────┴─────┐               ┌──────────┐
 *  │  result  │               │ launching│
 *  └────▲─────┘               └────┬─────┘
 *       │                          │ LAUNCH_COMPLETE
 *  REVEAL│                         ▼
 *  ┌────┴─────┐               ┌──────────┐
 *  │  landed  │◀──────────────│  impact  │
 *  └──────────┘  IMPACT_      └──────────┘
 *                COMPLETE
 */

/* ── Reducer ─────────────────────────────────────────────── */

function reducer(state: RouletteState, event: RouletteEvent): RouletteState {
  switch (event.type) {
    case "START_PULL": {
      if (state.phase !== "idle") return state;
      return { ...state, phase: "pulling", pullStrength: 0, offsetY: 0 };
    }

    case "UPDATE_PULL": {
      if (state.phase !== "pulling") return state;
      return {
        ...state,
        pullStrength: event.pullStrength,
        offsetY: event.offsetY,
      };
    }

    case "RELEASE": {
      if (state.phase !== "pulling") return state;

      /* Insufficient pull → snap back to idle */
      if (state.pullStrength < MIN_LAUNCH_STRENGTH) {
        return { ...state, phase: "idle", pullStrength: 0, offsetY: 0 };
      }

      /* Strong enough → pick destination and launch */
      const dest = selectRandomDestination(state.selectedDestination);
      return {
        ...state,
        phase: "launching",
        lastPullStrength: state.pullStrength,
        selectedDestination: dest,
        pullStrength: 0,
        offsetY: 0,
      };
    }

    case "LAUNCH_COMPLETE": {
      if (state.phase !== "launching") return state;
      return { ...state, phase: "impact" };
    }

    case "IMPACT_COMPLETE": {
      if (state.phase !== "impact") return state;
      return { ...state, phase: "landed" };
    }

    case "REVEAL": {
      if (state.phase !== "landed") return state;
      return { ...state, phase: "result" };
    }

    case "RESET": {
      if (state.phase !== "result" && state.phase !== "landed") return state;
      return { ...INITIAL_STATE };
    }

    default:
      return state;
  }
}

/* ── Hook ────────────────────────────────────────────────── */

interface MachineReturn {
  readonly state: RouletteState;
  readonly send: (event: RouletteEvent) => void;
}

export function useRouletteMachine(): MachineReturn {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const prevPhaseRef = useRef<MachinePhase>("idle");

  /* ── Timer refs ────────────────────────────────────────── */

  /** setTimeout id for the launch duration timer */
  const launchTimerId = useRef(0);

  /** setTimeout id for the impact hold timer */
  const impactTimerId = useRef(0);

  /* ── Sync machine state → ref-based store (for R3F) ────── */

  useEffect(() => {
    rouletteStore.setPhase(state.phase);
    rouletteStore.setPullStrength(state.pullStrength);
    rouletteStore.setLastPullStrength(state.lastPullStrength);
    rouletteStore.setSelectedDestination(state.selectedDestination);
  }, [
    state.phase,
    state.pullStrength,
    state.lastPullStrength,
    state.selectedDestination,
  ]);

  /* ── Phase-transition side effects ─────────────────────── */

  useEffect(() => {
    const prev = prevPhaseRef.current;
    prevPhaseRef.current = state.phase;

    /* ── pulling → launching ─────────────────────────────── */
    if (state.phase === "launching" && prev !== "launching") {
      if (state.selectedDestination) {
        const currentY = rouletteStore.getState().earthRotationY;
        const baseTarget = lngToGlobeRotationY(
          state.selectedDestination.lng,
        );
        const TWO_PI = Math.PI * 2;

        let target = baseTarget;
        while (target < currentY) target += TWO_PI;
        target += TWO_PI * DRAMATIC_SPIN_REVOLUTIONS;

        rouletteStore.setTargetRotationY(target);
      }

      /*
       * Record launch start time in the store so R3F components
       * can compute their own progress each frame via useFrame.
       * Use setTimeout (not rAF) for the state transition —
       * rAF pauses when the tab loses visibility or focus.
       */
      rouletteStore.setLaunchStartTime(performance.now());
      rouletteStore.setLaunchProgress(0);

      launchTimerId.current = window.setTimeout(() => {
        rouletteStore.setLaunchProgress(1);
        dispatch({ type: "LAUNCH_COMPLETE" });
      }, LAUNCH_DURATION_MS);
    }

    /* ── launching → impact ──────────────────────────────── */
    if (state.phase === "impact" && prev !== "impact") {
      impactTimerId.current = window.setTimeout(() => {
        dispatch({ type: "IMPACT_COMPLETE" });
      }, IMPACT_HOLD_MS);
    }

    /* ── result/landed → idle (via RESET) ────────────────── */
    if (state.phase === "idle" && (prev === "result" || prev === "landed")) {
      rouletteStore.setLaunchProgress(0);
      rouletteStore.setLaunchStartTime(0);
      rouletteStore.setTargetRotationY(null);
    }

    return () => {
      clearTimeout(launchTimerId.current);
      clearTimeout(impactTimerId.current);
    };
  }, [state.phase, state.selectedDestination]);

  /* ── Cleanup on unmount ────────────────────────────────── */

  useEffect(() => {
    return () => {
      clearTimeout(launchTimerId.current);
      clearTimeout(impactTimerId.current);
    };
  }, []);

  /* ── Stable dispatch wrapper ───────────────────────────── */

  const send = useCallback((event: RouletteEvent) => {
    dispatch(event);
  }, []);

  return { state, send };
}
