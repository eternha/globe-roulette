import { useReducer, useCallback, useEffect, useRef } from "react";
import type { MachinePhase, Destination } from "../data/types";
import { rouletteStore } from "../stores/rouletteStore";
import { selectRandomDestination } from "../lib/selectDestination";
import { lngToGlobeRotationY } from "../lib/geo";

/* ── Configuration ───────────────────────────────────────── */

/** Minimum pull strength required to trigger a launch */
const MIN_LAUNCH_STRENGTH = 0.15;

/** Delay before auto-transitioning impact → result (ms) */
const IMPACT_HOLD_MS = 600;

/** Total launch animation duration (ms) */
const LAUNCH_DURATION_MS = 1200;

/** Extra full revolutions added during launch for dramatic spin */
const DRAMATIC_SPIN_REVOLUTIONS = 2;

/* ── Events ──────────────────────────────────────────────── */

export type RouletteEvent =
  | { type: "START_PULL" }
  | { type: "UPDATE_PULL"; pullStrength: number; offsetY: number }
  | { type: "RELEASE" }
  | { type: "LAUNCH_COMPLETE" }
  | { type: "IMPACT_COMPLETE" }
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

/* ── Transition table (for debugging / reference) ────────── *
 *
 *  ┌─────────────┐  START_PULL   ┌──────────┐
 *  │    idle      │─────────────▶│ pulling  │
 *  └──────┬──────┘               └────┬─────┘
 *         ▲                      RELEASE│ (strength < min → idle)
 *   RESET │                           ▼
 *  ┌──────┴──────┐               ┌──────────┐
 *  │   result    │◀─────────────│ launching│
 *  └─────────────┘  IMPACT_     └────┬─────┘
 *         ▲          COMPLETE        │ LAUNCH_COMPLETE
 *         │                          ▼
 *         │                     ┌──────────┐
 *         └─────────────────────│  impact  │
 *                               └──────────┘
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
      return { ...state, phase: "result" };
    }

    case "RESET": {
      if (state.phase !== "result") return state;
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

/**
 * Central state machine for the entire roulette experience.
 *
 * Owns all UI-facing state (phase, pull values, destination).
 * Manages side effects: launch rAF timer, impact→result timer,
 * globe target rotation, and ref-based store sync for R3F.
 *
 * Every state transition is triggered by an explicit RouletteEvent.
 * Invalid transitions are silently ignored (reducer returns current state).
 */
export function useRouletteMachine(): MachineReturn {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const prevPhaseRef = useRef<MachinePhase>("idle");

  /* ── rAF launch timer ──────────────────────────────────── */

  const rafId = useRef(0);
  const launchStartTime = useRef(0);

  const launchTick = useCallback((now: number) => {
    const progress = Math.min(
      (now - launchStartTime.current) / LAUNCH_DURATION_MS,
      1,
    );
    rouletteStore.setLaunchProgress(progress);

    if (progress < 1) {
      rafId.current = requestAnimationFrame(launchTick);
    } else {
      dispatch({ type: "LAUNCH_COMPLETE" });
    }
  }, []);

  /* ── Impact hold timer ─────────────────────────────────── */

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
      /* Compute globe target rotation so the destination faces camera */
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

      /* Start the rAF-driven launch animation (writes launchProgress 0→1) */
      rouletteStore.setLaunchProgress(0);
      launchStartTime.current = performance.now();
      rafId.current = requestAnimationFrame(launchTick);
    }

    /* ── launching → impact ──────────────────────────────── */
    if (state.phase === "impact" && prev !== "impact") {
      impactTimerId.current = window.setTimeout(() => {
        dispatch({ type: "IMPACT_COMPLETE" });
      }, IMPACT_HOLD_MS);
    }

    /* ── result → idle (via RESET) ───────────────────────── */
    if (state.phase === "idle" && prev === "result") {
      rouletteStore.setLaunchProgress(0);
      rouletteStore.setTargetRotationY(null);
    }

    return () => {
      clearTimeout(impactTimerId.current);
    };
  }, [state.phase, state.selectedDestination, launchTick]);

  /* ── Cleanup on unmount ────────────────────────────────── */

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(impactTimerId.current);
    };
  }, []);

  /* ── Stable dispatch wrapper ───────────────────────────── */

  const send = useCallback((event: RouletteEvent) => {
    dispatch(event);
  }, []);

  return { state, send };
}
