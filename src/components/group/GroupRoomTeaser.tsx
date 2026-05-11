import { useEffect } from "react";
import { trackGroupRoomTeaserViewed } from "../../lib/analytics";
import { IconUsers } from "../ui/Icons";
import "./group-room.css";

/* ── Props ──────────────────────────────────────────────────── */

interface GroupRoomTeaserProps {
  readonly onOpen: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function GroupRoomTeaser({ onOpen }: GroupRoomTeaserProps) {
  useEffect(() => {
    trackGroupRoomTeaserViewed();
  }, []);

  return (
    <div className="grp-teaser">
      <div
        className="grp-teaser-inner"
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
        <IconUsers size={16} className="grp-teaser-icon" />
        <div className="grp-teaser-text">
          <p className="grp-teaser-copy">
            Planning with friends? Create a Trip Room and let
            everyone pick together.
          </p>
          <p className="grp-teaser-cta">Plan with friends</p>
        </div>
        <svg
          className="grp-teaser-chevron"
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
