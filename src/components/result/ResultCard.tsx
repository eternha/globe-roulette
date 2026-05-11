import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import type { Destination } from "../../data/types";
import { getWhyNow } from "../../lib/whyNow";
import {
  isDestinationSaved,
  toggleSavedDestination,
} from "../../lib/savedDestinations";
import { getHighlightDetail } from "../../data/highlightDetails";
import type { HighlightDetail } from "../../data/highlightDetails";
import {
  getBookingActions,
  openAffiliateLink,
  shouldShowBookingSection,
  shouldShowDisclosure,
  AFFILIATE_DISCLOSURE,
} from "../../lib/monetization";
import type { BookingAction } from "../../lib/monetization";
import {
  trackDestinationCardViewed,
  trackMonetizationActionsViewed,
  trackProviderShown,
  trackProTeaserClicked,
  trackItineraryCtaViewed,
  trackItineraryCtaClicked,
} from "../../lib/analytics";
import { isProFlagEnabled, isItineraryFlagEnabled, isGroupTripFlagEnabled, isPackFlagEnabled } from "../../config/features";
import { isProUnlocked } from "../../lib/proAccess";
import { ProTeaser } from "../pro/ProTeaser";
import { ProModal } from "../pro/ProModal";
import { ItinerarySheet } from "../itinerary/ItinerarySheet";
import { GroupRoomTeaser } from "../group/GroupRoomTeaser";
import { GroupRoomSheet } from "../group/GroupRoomSheet";
import { PackTeaser } from "../packs/PackTeaser";
import { PackSheet } from "../packs/PackSheet";
import { CategoryIcon, IconRoute } from "../ui/Icons";
import { HighlightSheet } from "./HighlightSheet";
import "./result-card.css";
import "./highlight-sheet.css";

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
  const [activeHighlight, setActiveHighlight] = useState<HighlightDetail | null>(null);
  const [proModalOpen, setProModalOpen] = useState(false);
  const [itinerarySheetOpen, setItinerarySheetOpen] = useState(false);
  const [groupRoomSheetOpen, setGroupRoomSheetOpen] = useState(false);
  const [packSheetOpen, setPackSheetOpen] = useState(false);

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

    /* Body WITHOUT the URL — Web Share API receivers (WhatsApp, etc.)
       concatenate `text` + `url`, so embedding the URL here would
       duplicate it. */
    const shareBody = [
      `${destination.name}, ${destination.country}`,
      destination.shortDescription,
      "",
      `Travel Roulette chose our next trip ✈`,
    ].join("\n");

    /* Clipboard fallback DOES include the URL as a single string. */
    const clipboardText = `${shareBody}\n${shareUrl}`;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: `${destination.name} — Travel Roulette`,
          text: shareBody,
          url: shareUrl,
        });
        showToast("Shared successfully");
        return;
      } catch {
        /* User cancelled or share failed — fall through to clipboard */
      }
    }

    try {
      await navigator.clipboard.writeText(clipboardText);
      showToast("Copied to clipboard");
    } catch {
      showToast("Could not copy");
    }
  }, [destination, showToast]);

  const whyNow = useMemo(() => getWhyNow(destination), [destination]);
  const highlights = destination.highlights.slice(0, MAX_HIGHLIGHTS);
  const bookingActions = useMemo(() => getBookingActions(destination), [destination]);
  const showBooking = shouldShowBookingSection() && bookingActions.length > 0;
  const primaryActions = useMemo(
    () => bookingActions.filter((a) => a.isPrimary),
    [bookingActions],
  );
  const secondaryActions = useMemo(
    () => bookingActions.filter((a) => !a.isPrimary),
    [bookingActions],
  );

  const handleBookingClick = useCallback(
    (action: BookingAction) => {
      openAffiliateLink(action, destination.name);
    },
    [destination.name],
  );

  /* ── Pro teaser ───────────────────────────────────────────── */

  const showProTeaser =
    isProFlagEnabled("enable_pro_teaser") && !isProUnlocked();

  const handleExplorePro = useCallback(() => {
    trackProTeaserClicked(destination.name);
    setProModalOpen(true);
  }, [destination.name]);

  /* ── Itinerary CTA ──────────────────────────────────────── */

  const showItineraryCta = isItineraryFlagEnabled("enable_ai_itinerary");

  const handleItineraryClick = useCallback(() => {
    trackItineraryCtaClicked(destination.name);
    setItinerarySheetOpen(true);
  }, [destination.name]);

  /* ── Group Trip Room teaser ───────────────────────────────── */

  const showGroupTeaser = isGroupTripFlagEnabled("enable_group_rooms");

  const handleGroupRoomOpen = useCallback(() => {
    setGroupRoomSheetOpen(true);
  }, []);

  /* ── Destination pack teaser ─────────────────────────────── */

  const showPackTeaser = isPackFlagEnabled("enable_pack_teaser");

  const handlePackOpen = useCallback(() => {
    setPackSheetOpen(true);
  }, []);

  /* ── Analytics: fire once when card mounts ─────────────── */

  useEffect(() => {
    trackDestinationCardViewed(destination.name, destination.country);
  }, [destination.name, destination.country]);

  useEffect(() => {
    if (!showBooking) return;
    trackMonetizationActionsViewed(destination.name);
    for (const action of bookingActions) {
      trackProviderShown(action.providerId, action.category, destination.name);
    }
  }, [showBooking, bookingActions, destination.name]);

  useEffect(() => {
    if (showItineraryCta) {
      trackItineraryCtaViewed(destination.name);
    }
  }, [showItineraryCta, destination.name]);

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
                {highlights.map((h, i) => {
                  const detail = getHighlightDetail(h);
                  if (detail) {
                    return (
                      <button
                        key={`${h}-${i}`}
                        type="button"
                        className="result-highlight-tag result-highlight-tag--clickable"
                        onClick={() => setActiveHighlight(detail)}
                      >
                        <span className="result-highlight-dot" />
                        {h}
                        <svg className="result-highlight-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 4l4 4-4 4" />
                        </svg>
                      </button>
                    );
                  }
                  return (
                    <span key={`${h}-${i}`} className="result-highlight-tag">
                      <span className="result-highlight-dot" />
                      {h}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Itinerary CTA */}
            {showItineraryCta && (
              <div className="itin-cta">
                <button
                  type="button"
                  className="itin-cta-btn"
                  onClick={handleItineraryClick}
                >
                  <IconRoute size={14} className="itin-cta-icon" />
                  <span className="itin-cta-text">Generate itinerary</span>
                </button>
              </div>
            )}

            {/* Booking section — only renders when monetization is enabled */}
            {showBooking && (
              <div className="result-booking" aria-label="Book your trip">
                <p className="result-booking-label">Book your trip</p>

                {/* Primary CTAs: flights, hotels, experiences */}
                <div className="result-booking-primary">
                  {primaryActions.map((action) => (
                    <button
                      key={action.providerId}
                      type="button"
                      className="result-btn result-btn--affiliate"
                      onClick={() => handleBookingClick(action)}
                    >
                      <CategoryIcon category={action.category} size={14} />
                      {action.label}
                    </button>
                  ))}
                </div>

                {/* Secondary: eSIM, insurance, transfers, car rental */}
                {secondaryActions.length > 0 && (
                  <div className="result-booking-secondary">
                    {secondaryActions.map((action) => (
                      <button
                        key={action.providerId}
                        type="button"
                        className="result-btn result-btn--ghost result-btn--compact"
                        onClick={() => handleBookingClick(action)}
                      >
                        <CategoryIcon category={action.category} size={13} />
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Affiliate disclosure */}
                {shouldShowDisclosure() && (
                  <p className="result-affiliate-disclosure">
                    {AFFILIATE_DISCLOSURE}
                  </p>
                )}
              </div>
            )}

            {/* Pro teaser — subtle, non-aggressive */}
            {showProTeaser && (
              <ProTeaser
                destination={destination.name}
                onExplorePro={handleExplorePro}
              />
            )}

            {/* Group Trip Room teaser */}
            {showGroupTeaser && (
              <GroupRoomTeaser onOpen={handleGroupRoomOpen} />
            )}

            {/* Destination packs teaser */}
            {showPackTeaser && (
              <PackTeaser onOpen={handlePackOpen} />
            )}

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

      {/* Highlight detail sheet */}
      {activeHighlight && (
        <HighlightSheet
          detail={activeHighlight}
          onClose={() => setActiveHighlight(null)}
        />
      )}

      {/* Pro modal */}
      {proModalOpen && (
        <ProModal
          source="teaser"
          onClose={() => setProModalOpen(false)}
        />
      )}

      {/* Itinerary sheet */}
      {itinerarySheetOpen && (
        <ItinerarySheet
          destination={destination}
          onClose={() => setItinerarySheetOpen(false)}
        />
      )}

      {/* Group Trip Room sheet */}
      {groupRoomSheetOpen && (
        <GroupRoomSheet
          onClose={() => setGroupRoomSheetOpen(false)}
        />
      )}

      {/* Destination packs sheet */}
      {packSheetOpen && (
        <PackSheet
          onClose={() => setPackSheetOpen(false)}
        />
      )}
    </>
  );
}
