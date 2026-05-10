import { useState, useCallback, useMemo, useRef } from "react";
import type { Destination } from "../../data/types";
import { getWhyNow } from "../../lib/whyNow";
import {
  isDestinationSaved,
  toggleSavedDestination,
} from "../../lib/savedDestinations";
import "./result-card.css";

/** Maximum highlights shown on the card to keep it uncluttered. */
const MAX_HIGHLIGHTS = 3;

/** Minimum downward drag (px) before the sheet dismisses on release. */
const DISMISS_THRESHOLD = 80;

interface ResultCardProps {
  destination: Destination;
  onTryAgain: () => void;
  onDismiss?: () => void;
}

/* ── Inline SVG icons (no external deps) ─────────────────── */

function IconRefresh() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 8a5.5 5.5 0 0 1 9.3-4" />
      <path d="M13.5 8a5.5 5.5 0 0 1-9.3 4" />
      <polyline points="8.5 3.5 12 3.5 12 0.5" />
      <polyline points="7.5 12.5 4 12.5 4 15.5" />
    </svg>
  );
}

function IconBookmark({ filled }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 2.5h9v12l-4.5-3-4.5 3z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 10V2.5" />
      <polyline points="4.5 5.5 8 2 11.5 5.5" />
      <path d="M13.5 10v3a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-3" />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────── */

export function ResultCard({ destination, onTryAgain, onDismiss }: ResultCardProps) {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(
    null,
  );
  const [saved, setSaved] = useState(() =>
    isDestinationSaved(destination.id),
  );

  /* ── Swipe-to-dismiss state ─────────────────────────────── */
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const dragStartY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((clientY: number) => {
    dragStartY.current = clientY;
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback(
    (clientY: number) => {
      if (!isDragging) return;
      const dy = Math.max(0, clientY - dragStartY.current);
      setDragY(dy);
    },
    [isDragging],
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragY > DISMISS_THRESHOLD) {
      setIsDismissing(true);
      /* Let the CSS exit animation play, then call onDismiss */
      setTimeout(() => {
        onDismiss?.();
      }, 350);
    } else {
      setDragY(0);
    }
  }, [isDragging, dragY, onDismiss]);

  const handleHandlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      e.preventDefault();
      handleDragStart(e.clientY);
    },
    [handleDragStart],
  );

  const handleHandlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      handleDragMove(e.clientY);
    },
    [isDragging, handleDragMove],
  );

  const handleHandlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      handleDragEnd();
    },
    [handleDragEnd],
  );

  const showToast = useCallback((message: string) => {
    setToast(null);
    /* Force re-mount for animation restart */
    requestAnimationFrame(() =>
      setToast({ message, id: performance.now() }),
    );
  }, []);

  const handleSave = useCallback(() => {
    const nowSaved = toggleSavedDestination(destination.id);
    setSaved(nowSaved);
    showToast(nowSaved ? "Destination saved" : "Removed from saved");
  }, [destination.id, showToast]);

  const handleShare = useCallback(async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?dest=${encodeURIComponent(destination.id)}`;

    const shareText = [
      `${destination.name}, ${destination.country}`,
      destination.shortDescription,
      "",
      `Travel Roulette chose our next trip ✈`,
      shareUrl,
    ].join("\n");

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: `${destination.name} — Travel Roulette`,
          text: shareText,
          url: shareUrl,
        });
        showToast("Shared successfully");
        return;
      } catch {
        /* User cancelled or share failed — fall through to clipboard */
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      showToast("Copied to clipboard");
    } catch {
      showToast("Could not copy");
    }
  }, [destination, showToast]);

  const whyNow = useMemo(() => getWhyNow(destination), [destination]);
  const highlights = destination.highlights.slice(0, MAX_HIGHLIGHTS);

  return (
    <>
      <div className="result-backdrop" onClick={onDismiss}>
        <div
          ref={sheetRef}
          className={`result-sheet ${isDismissing ? "result-sheet--dismissing" : ""}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
            transition: isDragging ? "none" : undefined,
          }}
        >
          {/* Drag handle — outside the scrollable area so scroll never steals pointer */}
          <div
            className="result-handle"
            onPointerDown={handleHandlePointerDown}
            onPointerMove={handleHandlePointerMove}
            onPointerUp={handleHandlePointerUp}
            onPointerCancel={handleHandlePointerUp}
          >
            <div className="result-handle-bar" />
          </div>

          {/* Scrollable content */}
          <div className="result-scroll">
            {/* Header */}
            <div className="result-header">
              <p className="result-label">Your destination</p>
              <h2 className="result-name">{destination.name}</h2>
              <p className="result-country">{destination.country}</p>
            </div>

            <hr className="result-divider" />

            {/* Description */}
            <p className="result-description">{destination.shortDescription}</p>

            {/* Info sections */}
            <div className="result-sections">
              <div className="result-info-card">
                <p className="result-info-label">Why visit</p>
                <p className="result-info-value">{destination.whyVisit}</p>
              </div>

              <div className="result-info-card">
                <p className="result-info-label">Why now</p>
                <p className="result-info-value">{whyNow}</p>
              </div>

              <div className="result-info-card">
                <p className="result-info-label">Best time</p>
                <p className="result-info-value">{destination.bestSeason}</p>
              </div>
            </div>

            {/* Vibe */}
            <div className="result-vibe-row">
              <span className="result-vibe-label">Vibe</span>
              <span className="result-vibe-pill">{destination.vibe}</span>
            </div>

            {/* Highlights */}
            <div className="result-highlights">
              <p className="result-highlights-label">Highlights</p>
              <div className="result-highlights-list">
                {highlights.map((h, i) => (
                  <span key={`${h}-${i}`} className="result-highlight-tag">
                    <span className="result-highlight-dot" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="result-actions">
              <button
                type="button"
                className="result-btn result-btn--primary"
                onClick={onTryAgain}
              >
                <IconRefresh />
                Try again
              </button>

              <button
                type="button"
                className={`result-btn ${saved ? "result-btn--ghost-active" : "result-btn--ghost"}`}
                onClick={handleSave}
              >
                <IconBookmark filled={saved} />
                {saved ? "Saved" : "Save"}
              </button>

              <button
                type="button"
                className="result-btn result-btn--ghost"
                onClick={handleShare}
              >
                <IconShare />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          key={toast.id}
          className="result-toast"
          onAnimationEnd={() => setToast(null)}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}
