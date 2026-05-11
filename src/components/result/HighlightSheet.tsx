import { useState, useCallback, useRef } from "react";
import type { HighlightDetail } from "../../data/highlightDetails";
import "./highlight-sheet.css";

interface HighlightSheetProps {
  readonly detail: HighlightDetail;
  readonly onClose: () => void;
}

/* ── Inline SVG icons ──────────────────────────────────────── */

function IconBack() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 3L5 8l5 5" />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 9v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" />
      <path d="M9 2h5v5" />
      <path d="M6 10L14 2" />
    </svg>
  );
}

/* ── Main component ───────────────────────────────────────── */

export function HighlightSheet({ detail, onClose }: HighlightSheetProps) {
  const [isDismissing, setIsDismissing] = useState(false);

  /* ── Swipe-to-dismiss ──────────────────────────────────── */
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);

  const DISMISS_THRESHOLD = 80;

  const handleClose = useCallback(() => {
    setIsDismissing(true);
    setTimeout(() => onClose(), 350);
  }, [onClose]);

  const handleDragStart = useCallback((clientY: number) => {
    dragStartY.current = clientY;
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback(
    (clientY: number) => {
      if (!isDragging) return;
      setDragY(Math.max(0, clientY - dragStartY.current));
    },
    [isDragging],
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragY > DISMISS_THRESHOLD) {
      handleClose();
    } else {
      setDragY(0);
    }
  }, [isDragging, dragY, handleClose]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      e.preventDefault();
      handleDragStart(e.clientY);
    },
    [handleDragStart],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      handleDragMove(e.clientY);
    },
    [isDragging, handleDragMove],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      handleDragEnd();
    },
    [handleDragEnd],
  );

  const handleExternalLink = useCallback(() => {
    if (detail.externalUrl) {
      window.open(detail.externalUrl, "_blank", "noopener,noreferrer");
    }
  }, [detail.externalUrl]);

  return (
    <>
      <div className="hl-backdrop" onClick={handleClose}>
        <div
          className={`hl-sheet ${isDismissing ? "hl-sheet--dismissing" : ""}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
            transition: isDragging ? "none" : undefined,
          }}
        >
          {/* ── Drag handle ─────────────────────────────────── */}
          <div
            className="hl-handle"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="hl-handle-bar" />
          </div>

          {/* ── Scrollable content ──────────────────────────── */}
          <div className="hl-scroll">
            {/* Back button + title row */}
            <div className="hl-top-bar">
              <button
                type="button"
                className="hl-back-btn"
                onClick={handleClose}
                aria-label="Go back"
              >
                <IconBack />
                <span>Back</span>
              </button>
            </div>

            {/* Title header */}
            <div className="hl-text-header">
              <h3 className="hl-text-title">{detail.title}</h3>
            </div>

            {/* Description */}
            <p className="hl-description">{detail.description}</p>

            {/* Facts grid */}
            <div className="hl-facts">
              <p className="hl-section-label">Key Facts</p>
              <div className="hl-facts-grid">
                {detail.facts.map((fact) => (
                  <div key={fact.label} className="hl-fact">
                    <span className="hl-fact-label">{fact.label}</span>
                    <span className="hl-fact-value">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery — hidden in text-only mode */}

            {/* External link */}
            {detail.externalUrl && (
              <button
                type="button"
                className="hl-external-btn"
                onClick={handleExternalLink}
              >
                <IconExternal />
                Learn more
              </button>
            )}
          </div>
        </div>
      </div>

    </>
  );
}
