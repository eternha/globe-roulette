import { useState, useCallback, useMemo } from "react";
import type { Destination } from "../../data/types";
import { destinations } from "../../data/destinations";
import {
  getSavedDestinations,
  toggleSavedDestination,
} from "../../lib/savedDestinations";
import "./saved-panel.css";

interface SavedPanelProps {
  readonly onClose: () => void;
  readonly onSelectDestination?: (dest: Destination) => void;
}

/**
 * Full-screen overlay showing all saved destinations.
 * Pulls IDs from localStorage via savedDestinations lib,
 * resolves them against the master destinations list.
 */
export function SavedPanel({ onClose, onSelectDestination }: SavedPanelProps) {
  const [savedIds, setSavedIds] = useState(() =>
    getSavedDestinations().map((e) => e.id),
  );

  const savedDestinations = useMemo(
    () =>
      savedIds
        .map((id) => destinations.find((d) => d.id === id))
        .filter((d): d is Destination => d != null),
    [savedIds],
  );

  const handleRemove = useCallback((id: string) => {
    toggleSavedDestination(id);
    setSavedIds((prev) => prev.filter((i) => i !== id));
  }, []);

  return (
    <div className="saved-backdrop" onClick={onClose}>
      <div
        className="saved-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="saved-header">
          <h2 className="saved-title">Saved Destinations</h2>
          <button
            type="button"
            className="saved-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {/* List */}
        {savedDestinations.length === 0 ? (
          <div className="saved-empty">
            <p className="saved-empty-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              >
                <path d="M3.5 2.5h9v12l-4.5-3-4.5 3z" />
              </svg>
            </p>
            <p className="saved-empty-text">No saved destinations yet</p>
            <p className="saved-empty-hint">
              Tap the Save button on any result card to bookmark it here
            </p>
          </div>
        ) : (
          <ul className="saved-list">
            {savedDestinations.map((dest) => (
              <li key={dest.id} className="saved-item">
                <button
                  type="button"
                  className="saved-item-info"
                  onClick={() => onSelectDestination?.(dest)}
                >
                  <p className="saved-item-name">{dest.name}</p>
                  <p className="saved-item-country">{dest.country}</p>
                  <p className="saved-item-vibe">{dest.vibe}</p>
                </button>
                <button
                  type="button"
                  className="saved-item-remove"
                  onClick={() => handleRemove(dest.id)}
                  aria-label={`Remove ${dest.name}`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.5 2.5h9v12l-4.5-3-4.5 3z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
