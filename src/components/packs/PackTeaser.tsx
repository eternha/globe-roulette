import { useEffect } from "react";
import { trackDestinationPackViewed } from "../../lib/analytics";
import { IconGrid } from "../ui/Icons";
import "./pack-teaser.css";

/* ── Props ──────────────────────────────────────────────────── */

interface PackTeaserProps {
  readonly onOpen: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function PackTeaser({ onOpen }: PackTeaserProps) {
  useEffect(() => {
    trackDestinationPackViewed("teaser");
  }, []);

  return (
    <div className="pack-teaser">
      <div
        className="pack-teaser-inner"
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        <IconGrid size={16} className="pack-teaser-icon" />
        <div className="pack-teaser-text">
          <p className="pack-teaser-copy">
            Try themed roulettes — Romantic Europe, Foodie Cities,
            Adventure and more.
          </p>
          <p className="pack-teaser-cta">Destination packs coming soon</p>
        </div>
        <svg
          className="pack-teaser-chevron"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4l4 4-4 4" />
        </svg>
      </div>
    </div>
  );
}
