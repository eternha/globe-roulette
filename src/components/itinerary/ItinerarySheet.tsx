import { useState, useCallback, useEffect, useMemo } from "react";
import type { Destination } from "../../data/types";
import type { ItineraryStyle, TravelItinerary, ItineraryOptions } from "../../types/itinerary";
import { isItineraryFlagEnabled } from "../../config/features";
import { isProUnlocked } from "../../lib/proAccess";
import { useSwipeToDismiss } from "../../hooks/useSwipeToDismiss";
import {
  ITINERARY_STYLES,
  DURATION_OPTIONS,
  ITINERARY_ACCESS_MODE,
  getItineraryPricingLabel,
} from "../../config/itinerary";
import { generateMockItinerary } from "../../services/itineraryService";
import {
  trackItineraryModalOpened,
  trackItineraryStyleSelected,
  trackItineraryDurationSelected,
  trackMockItineraryGenerated,
  trackItineraryPaywallViewed,
  trackItineraryPurchasePlaceholderClicked,
} from "../../lib/analytics";
import { IconRoute } from "../ui/Icons";
import "./itinerary-sheet.css";

/* ── Props ──────────────────────────────────────────────────── */

interface ItinerarySheetProps {
  readonly destination: Destination;
  readonly onClose: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function ItinerarySheet({ destination, onClose }: ItinerarySheetProps) {
  const [duration, setDuration] = useState(3);
  const [style, setStyle] = useState<ItineraryStyle>("first_time");
  const [itinerary, setItinerary] = useState<TravelItinerary | null>(null);

  const swipe = useSwipeToDismiss(onClose);

  /* ── Access check ─────────────────────────────────────────── */

  const isProGated =
    isItineraryFlagEnabled("enable_ai_itinerary_pro_gate") &&
    ITINERARY_ACCESS_MODE !== "free";

  const hasAccess = !isProGated || isProUnlocked();
  const canGenerate = hasAccess && isItineraryFlagEnabled("enable_mock_itinerary");

  /* ── Analytics ────────────────────────────────────────────── */

  useEffect(() => {
    trackItineraryModalOpened(destination.name);
  }, [destination.name]);

  useEffect(() => {
    if (isProGated && !hasAccess) {
      trackItineraryPaywallViewed(destination.name);
    }
  }, [isProGated, hasAccess, destination.name]);

  /* ── Handlers ─────────────────────────────────────────────── */

  const handleDurationChange = useCallback(
    (days: number) => {
      setDuration(days);
      setItinerary(null);
      trackItineraryDurationSelected(String(days), destination.name);
    },
    [destination.name],
  );

  const handleStyleChange = useCallback(
    (s: ItineraryStyle) => {
      setStyle(s);
      setItinerary(null);
      trackItineraryStyleSelected(s, destination.name);
    },
    [destination.name],
  );

  const handleGenerate = useCallback(() => {
    if (!canGenerate) return;

    const options: ItineraryOptions = { duration, style };
    const result = generateMockItinerary(destination, options);
    setItinerary(result);
    trackMockItineraryGenerated(destination.name, style, String(duration));
  }, [canGenerate, duration, style, destination]);

  const handlePaywallCta = useCallback(() => {
    trackItineraryPurchasePlaceholderClicked(destination.name);
    /* Future: open Stripe / Pro modal */
  }, [destination.name]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const pricingLabel = useMemo(() => getItineraryPricingLabel(), []);

  return (
    <div className="itin-backdrop" onClick={handleBackdropClick}>
      <div
        className={`itin-sheet${swipe.isDismissing ? " itin-sheet--dismissing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Generate itinerary"
        style={{
          transform: swipe.dragY > 0 ? `translateY(${swipe.dragY}px)` : undefined,
          transition: swipe.isDragging ? "none" : undefined,
        }}
      >
        <div className="itin-handle" {...swipe.handlers}>
          <div className="itin-handle-bar" />
        </div>

        <div className="itin-scroll">
          {/* Header */}
          <div className="itin-header">
            <div className="itin-header-badge">
              <IconRoute size={11} />
              AI Itinerary
            </div>
            <h2 className="itin-title">{destination.name}</h2>
            <p className="itin-subtitle">
              {destination.country} &middot; {destination.vibe}
            </p>
          </div>

          {/* Paywall — shown when Pro-gated and user doesn't have access */}
          {isProGated && !hasAccess ? (
            <div className="itin-paywall">
              <div className="itin-paywall-icon"><IconRoute size={28} /></div>
              <h3 className="itin-paywall-title">
                AI Itineraries
              </h3>
              <p className="itin-paywall-desc">
                Get personalized day-by-day trip plans generated
                for your travel style and duration.
              </p>
              <p className="itin-paywall-price">{pricingLabel}</p>

              {isItineraryFlagEnabled("enable_itinerary_purchase_placeholder") && (
                <button
                  type="button"
                  className="itin-generate-cta"
                  onClick={handlePaywallCta}
                >
                  Coming soon
                </button>
              )}

              <button
                type="button"
                className="itin-close-btn"
                onClick={onClose}
              >
                Maybe later
              </button>
            </div>
          ) : (
            <>
              {/* Itinerary not yet generated — show picker */}
              {!itinerary ? (
                <>
                  {/* Duration picker */}
                  <div className="itin-picker-section">
                    <p className="itin-picker-label">Duration</p>
                    <div className="itin-duration-row">
                      {DURATION_OPTIONS.map((opt) => (
                        <button
                          key={opt.days}
                          type="button"
                          className={`itin-duration-pill ${duration === opt.days ? "itin-duration-pill--active" : ""}`}
                          onClick={() => handleDurationChange(opt.days)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style picker */}
                  <div className="itin-picker-section">
                    <p className="itin-picker-label">Travel style</p>
                    <div className="itin-style-grid">
                      {ITINERARY_STYLES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          className={`itin-style-card ${style === s.id ? "itin-style-card--active" : ""}`}
                          onClick={() => handleStyleChange(s.id)}
                        >
                          <span className="itin-style-dot" />
                          <div className="itin-style-text">
                            <p className="itin-style-name">{s.label}</p>
                            <p className="itin-style-desc">{s.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate CTA */}
                  <button
                    type="button"
                    className="itin-generate-cta"
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                  >
                    Generate itinerary
                  </button>
                  <button
                    type="button"
                    className="itin-close-btn"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                /* Itinerary result view */
                <ItineraryResult itinerary={itinerary} onClose={onClose} onRegenerate={() => setItinerary(null)} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Itinerary result sub-component ─────────────────────────── */

function ItineraryResult({
  itinerary,
  onClose,
  onRegenerate,
}: {
  readonly itinerary: TravelItinerary;
  readonly onClose: () => void;
  readonly onRegenerate: () => void;
}) {
  const styleMeta = ITINERARY_STYLES.find((s) => s.id === itinerary.style);

  return (
    <>
      {/* Meta pills */}
      <div className="itin-result-meta">
        <span className="itin-result-pill">
          {styleMeta?.label}
        </span>
        <span className="itin-result-pill">
          {itinerary.duration} days
        </span>
        {itinerary.isMock && (
          <span className="itin-mock-badge">Preview</span>
        )}
      </div>

      {/* Day-by-day plan */}
      {itinerary.days.map((day) => (
        <div key={day.dayNumber} className="itin-day">
          <div className="itin-day-header">
            <div className="itin-day-number">{day.dayNumber}</div>
            <p className="itin-day-theme">{day.theme}</p>
          </div>
          <div className="itin-items">
            {day.items.map((item, i) => (
              <div key={`${day.dayNumber}-${i}`} className="itin-item">
                <div className="itin-item-top">
                  <span className="itin-item-dot" />
                  <p className="itin-item-title">{item.title}</p>
                  <span className="itin-item-time">{item.timeOfDay}</span>
                </div>
                <p className="itin-item-desc">{item.description}</p>
                {item.tip && (
                  <p className="itin-item-tip">{item.tip}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Actions */}
      <button
        type="button"
        className="itin-generate-cta"
        onClick={onRegenerate}
        style={{ marginTop: 20 }}
      >
        Try different options
      </button>
      <button
        type="button"
        className="itin-close-btn"
        onClick={onClose}
      >
        Close
      </button>
    </>
  );
}
