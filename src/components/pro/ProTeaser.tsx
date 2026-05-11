import { useEffect } from "react";
import { trackProTeaserViewed } from "../../lib/analytics";
import { IconSparkle } from "../ui/Icons";
import "./pro-modal.css";

/* ── Props ──────────────────────────────────────────────────── */

interface ProTeaserProps {
  readonly destination: string;
  readonly onExplorePro: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function ProTeaser({ destination, onExplorePro }: ProTeaserProps) {
  useEffect(() => {
    trackProTeaserViewed(destination);
  }, [destination]);

  return (
    <div className="pro-teaser">
      <div
        className="pro-teaser-inner"
        role="button"
        tabIndex={0}
        onClick={onExplorePro}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onExplorePro();
          }
        }}
      >
        <IconSparkle size={16} className="pro-teaser-icon" />
        <div className="pro-teaser-text">
          <p className="pro-teaser-copy">
            Unlock filters, group voting and smart itineraries
            with Travel Roulette Pro.
          </p>
          <p className="pro-teaser-cta">Explore Pro</p>
        </div>
        <svg
          className="pro-teaser-chevron"
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
