import { useCallback } from "react";
import type { LegalSection } from "./legal-copy";
import { useSwipeToDismiss } from "../../hooks/useSwipeToDismiss";
import "./legal-modal.css";

/* ── Types ──────────────────────────────────────────────────── */

export type LegalPage = "privacy" | "terms" | "disclosure";

interface LegalModalProps {
  readonly title: string;
  readonly lastUpdated: string;
  readonly sections: readonly LegalSection[];
  readonly onClose: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function LegalModal({
  title,
  lastUpdated,
  sections,
  onClose,
}: LegalModalProps) {
  const swipe = useSwipeToDismiss(onClose);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <div className="legal-backdrop" onClick={handleBackdropClick}>
      <div
        className={`legal-sheet${swipe.isDismissing ? " legal-sheet--dismissing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          transform: swipe.dragY > 0 ? `translateY(${swipe.dragY}px)` : undefined,
          transition: swipe.isDragging ? "none" : undefined,
        }}
      >
        <div className="legal-handle" {...swipe.handlers}>
          <div className="legal-handle-bar" />
        </div>

        <div className="legal-scroll">
          <div className="legal-header">
            <h2 className="legal-title">{title}</h2>
            <span className="legal-updated">Updated {lastUpdated}</span>
          </div>

          {sections.map((section) => (
            <div key={section.heading} className="legal-section">
              <h3 className="legal-section-heading">{section.heading}</h3>
              <p className="legal-section-body">{section.body}</p>
            </div>
          ))}

          <div className="legal-close">
            <button
              type="button"
              className="legal-close-btn"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
