import { useCallback, useEffect, useRef, useState } from "react";
import type { Destination } from "./data/types";
import { destinations } from "./data/destinations";
import { GlobeScene } from "./components/globe/GlobeScene";
import { PullArrow } from "./components/arrow/PullArrow";
import { ResultCard } from "./components/result/ResultCard";
import { SavedPanel } from "./components/saved/SavedPanel";
import { SiteFooter } from "./components/legal/SiteFooter";
import { useRouletteMachine } from "./hooks/useRouletteMachine";
import { usePullGesture } from "./hooks/usePullGesture";

export default function App() {
  const { state, send } = useRouletteMachine();
  const [savedOpen, setSavedOpen] = useState(false);

  /* ── Deep-link: ?dest=<id> opens directly to that destination ── */
  const deepLinkHandled = useRef(false);
  useEffect(() => {
    if (deepLinkHandled.current) return;

    const params = new URLSearchParams(window.location.search);
    const destId = params.get("dest");
    if (!destId) return;

    const dest = destinations.find((d) => d.id === destId);
    if (!dest) return;

    /* Mark handled INSIDE the timeout so React strict-mode
       double-invoke doesn't clear the timer before it fires. */
    const timer = window.setTimeout(() => {
      deepLinkHandled.current = true;
      send({ type: "GOTO_DESTINATION", destination: dest });
      /* Clean the URL so refreshing doesn't re-trigger */
      window.history.replaceState({}, "", window.location.pathname);
    }, 800);

    return () => clearTimeout(timer);
  }, [send]);

  /* ── Gesture → machine event wiring ────────────────────── */

  const isInteractive = state.phase === "idle" || state.phase === "pulling";

  const {
    ref: gestureRef,
    onPointerDown: gesturePointerDown,
    style: gestureStyle,
  } = usePullGesture({
    onStart: () => send({ type: "START_PULL" }),
    onMove: (pullStrength, offsetY) =>
      send({ type: "UPDATE_PULL", pullStrength, offsetY }),
    onRelease: () => send({ type: "RELEASE" }),
    disabled: !isInteractive,
  });

  const handleTryAgain = useCallback(() => {
    send({ type: "RESET" });
  }, [send]);

  const handleReveal = useCallback(() => {
    send({ type: "REVEAL" });
  }, [send]);

  const handleDismissResult = useCallback(() => {
    send({ type: "RESET" });
  }, [send]);

  const handleGoToDestination = useCallback(
    (dest: Destination) => {
      setSavedOpen(false);
      send({ type: "GOTO_DESTINATION", destination: dest });
    },
    [send],
  );

  /* ── Derived view state ────────────────────────────────── */

  const showResult = state.phase === "result";
  const isLanded = state.phase === "landed";
  const hideArrowArea =
    showResult || isLanded || state.phase === "impact" || state.phase === "launching";

  const hint = getHint(state.phase);

  return (
    <>
      <GlobeScene />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-margin-edge)",
        }}
      >
        <header
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "env(safe-area-inset-top, 16px)",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-on-surface)",
              opacity: 0.7,
            }}
          >
            Travel Roulette
          </h1>

          {/* Saved destinations button */}
          <button
            type="button"
            onClick={() => setSavedOpen(true)}
            aria-label="Saved destinations"
            style={{
              position: "absolute",
              right: 0,
              top: "env(safe-area-inset-top, 16px)",
              pointerEvents: "auto",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "8px 10px",
              color: "var(--color-on-surface-variant)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              WebkitTapHighlightColor: "transparent",
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 2.5h9v12l-4.5-3-4.5 3z" />
            </svg>
            Saved
          </button>
        </header>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            /* Keep arrow in the comfortable thumb zone on all phones */
            paddingBottom: "max(36px, env(safe-area-inset-bottom, 16px) + 20px)",
          }}
        >
          {/* "Tap to discover" prompt during landed phase */}
          {isLanded && (
            <button
              type="button"
              onClick={handleReveal}
              className="tap-hint-btn"
            >
              <span className="tap-hint-btn__dot" aria-hidden="true" />
              <span className="tap-hint-btn__label">Tap to discover</span>
            </button>
          )}

          {/* Arrow + hint (hidden during result/landed/impact) */}
          {!hideArrowArea && (
            <>
              <div
                ref={gestureRef}
                onPointerDown={gesturePointerDown}
                style={{
                  pointerEvents: isInteractive ? "auto" : "none",
                  /* Generous touch target — extends well beyond the arrow
                     so users can initiate the pull from anywhere in the
                     lower-center zone. 80×120 minimum hit area. */
                  padding: "16px 28px 12px",
                  margin: "-16px -28px -12px",
                  ...gestureStyle,
                }}
              >
                <PullArrow
                  pullStrength={state.pullStrength}
                  offsetY={state.offsetY}
                  isPulling={state.phase === "pulling"}
                  phase={state.phase}
                />
              </div>

              <p
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: hint.color,
                  opacity: hint.opacity,
                  transition: "color 0.2s, opacity 0.4s",
                  minHeight: "1em",
                }}
              >
                {hint.text}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Glassmorphic bottom sheet */}
      {showResult && state.selectedDestination && (
        <ResultCard
          destination={state.selectedDestination}
          onTryAgain={handleTryAgain}
          onDismiss={handleDismissResult}
        />
      )}

      {/* Saved destinations panel */}
      {savedOpen && (
        <SavedPanel
          onClose={() => setSavedOpen(false)}
          onSelectDestination={handleGoToDestination}
        />
      )}

      {/* Site footer — privacy, terms, disclosure */}
      <SiteFooter />
    </>
  );
}

/* ── Helpers ─────────────────────────────────────────────── */

interface HintConfig {
  readonly text: string;
  readonly color: string;
  readonly opacity: number;
}

function getHint(phase: string): HintConfig {
  switch (phase) {
    case "pulling":
      return {
        text: "Release to launch",
        color: "var(--color-surface-tint)",
        opacity: 0.8,
      };
    case "launching":
      return {
        text: "Launching…",
        color: "var(--color-surface-tint)",
        opacity: 0.6,
      };
    case "impact":
    case "landed":
    case "result":
      return {
        text: "",
        color: "var(--color-on-surface-variant)",
        opacity: 0,
      };
    default:
      return {
        text: "Pull and release",
        color: "var(--color-on-surface-variant)",
        opacity: 0.55,
      };
  }
}
