/**
 * Pro access utilities.
 *
 * Reads/writes Pro unlock state from localStorage.
 * In production, this will be replaced by a real payment
 * verification check (Stripe, Lemon Squeezy, etc.).
 *
 * The localStorage approach lets the full UI flow be tested
 * end-to-end without any backend or payment provider.
 */

import { isProFlagEnabled } from "../config/features";
import type { ProFeatureFlag } from "../types/monetization";
import type { ProPlanId } from "../config/pro";
import { PRO_PLANS } from "../config/pro";

/* ── Storage ────────────────────────────────────────────────── */

const STORAGE_KEY = "travel-roulette-pro";

interface ProState {
  readonly unlocked: boolean;
  readonly planId: ProPlanId | null;
  readonly unlockedAt: number | null;
}

const DEFAULT_STATE: ProState = {
  unlocked: false,
  planId: null,
  unlockedAt: null,
};

/** Read Pro state from localStorage. */
function readProState(): ProState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "unlocked" in parsed &&
      typeof (parsed as ProState).unlocked === "boolean"
    ) {
      return parsed as ProState;
    }
    return DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

/* ── Public API ─────────────────────────────────────────────── */

/**
 * Check if the user has Pro access.
 * Returns false if Pro is disabled globally via feature flags.
 */
export function isProUnlocked(): boolean {
  if (!isProFlagEnabled("enable_pro")) return false;
  return readProState().unlocked;
}

/**
 * Check whether a specific Pro-gated feature is available to the user.
 * A feature is available when:
 *  1. Its feature flag is enabled, AND
 *  2. The user has Pro access
 *
 * Returns `{ available: true }` or `{ available: false, reason }`.
 */
export function isProFeatureEnabled(
  flag: ProFeatureFlag,
): { available: boolean; reason?: string } {
  if (!isProFlagEnabled("enable_pro")) {
    return { available: false, reason: "Pro is disabled" };
  }
  if (!isProFlagEnabled(flag)) {
    return { available: false, reason: "Feature not yet enabled" };
  }
  if (!isProUnlocked()) {
    return { available: false, reason: "Pro required" };
  }
  return { available: true };
}

/**
 * Get the user's current Pro plan, if any.
 */
export function getProPlan(): ProState {
  return readProState();
}

/**
 * Get pricing plan details by ID.
 */
export function getPricingPlan(planId: ProPlanId) {
  return PRO_PLANS[planId];
}

/**
 * Stub: unlock Pro access for testing.
 *
 * In production, this will be called after a successful payment
 * webhook confirms the purchase. For now it writes directly
 * to localStorage.
 */
export function unlockPro(planId: ProPlanId): void {
  const state: ProState = {
    unlocked: true,
    planId,
    unlockedAt: Date.now(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Storage unavailable — fail silently */
  }
}

/**
 * Stub: revoke Pro access (for testing/debug).
 */
export function revokePro(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Storage unavailable */
  }
}
