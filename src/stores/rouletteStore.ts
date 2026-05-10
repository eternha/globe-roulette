import type { MachinePhase, Destination } from "../data/types";

/**
 * Minimal ref-based store for cross-boundary state sharing.
 *
 * React components (HTML overlay) write to this store.
 * R3F components (Canvas) read from it every frame via useFrame.
 * No re-renders are triggered — consumers poll current values.
 */

interface RouletteState {
  phase: MachinePhase;
  pullStrength: number;
  /** The strength captured at the moment of release (before reset) */
  lastPullStrength: number;
  /** 0 → 1 progress through the launch animation */
  launchProgress: number;
  /** performance.now() timestamp when the launch started */
  launchStartTime: number;
  /** Destination chosen at launch time */
  selectedDestination: Destination | null;
  /** Current Y rotation of the Earth mesh (radians), written each frame */
  earthRotationY: number;
  /**
   * Target Y rotation (radians) computed from the destination's longitude.
   * The Earth steers toward this value during the final portion of launch.
   */
  targetRotationY: number | null;
}

const state: RouletteState = {
  phase: "idle",
  pullStrength: 0,
  lastPullStrength: 0,
  launchProgress: 0,
  launchStartTime: 0,
  selectedDestination: null,
  earthRotationY: 0,
  targetRotationY: null,
};

export const rouletteStore = {
  getState(): Readonly<RouletteState> {
    return state;
  },

  setPhase(phase: MachinePhase): void {
    state.phase = phase;
  },

  setPullStrength(value: number): void {
    state.pullStrength = value;
  },

  setLastPullStrength(value: number): void {
    state.lastPullStrength = value;
  },

  setLaunchProgress(value: number): void {
    state.launchProgress = value;
  },

  setLaunchStartTime(value: number): void {
    state.launchStartTime = value;
  },

  setSelectedDestination(dest: Destination | null): void {
    state.selectedDestination = dest;
  },

  setEarthRotationY(radians: number): void {
    state.earthRotationY = radians;
  },

  setTargetRotationY(radians: number | null): void {
    state.targetRotationY = radians;
  },

  /** Reset all transient state back to idle defaults */
  reset(): void {
    state.phase = "idle";
    state.pullStrength = 0;
    state.lastPullStrength = 0;
    state.launchProgress = 0;
    state.launchStartTime = 0;
    state.selectedDestination = null;
    state.earthRotationY = 0;
    state.targetRotationY = null;
  },
} as const;
