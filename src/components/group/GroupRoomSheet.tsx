import { useState, useCallback, useEffect, useMemo } from "react";
import { isGroupTripFlagEnabled } from "../../config/features";
import { isProUnlocked } from "../../lib/proAccess";
import {
  GROUP_ROOM_DESCRIPTION,
  GROUP_ROOM_FEATURES,
  GROUP_ROOMS_COMING_SOON,
  GROUP_ROOM_ACCESS_MODE,
  getGroupRoomPricingLabel,
} from "../../config/groupTrip";
import {
  createMockTripRoom,
  getMockInviteLink,
} from "../../services/groupTripService";
import type { TripRoom } from "../../types/groupTrip";
import {
  trackGroupRoomModalOpened,
  trackGroupRoomMockCreated,
  trackGroupRoomPaywallViewed,
  trackGroupRoomTeaserClicked,
  trackInvitePlaceholderClicked,
} from "../../lib/analytics";
import { IconUsers, IconVote, IconSliders, IconGlobe, IconRoute } from "../ui/Icons";
import "./group-room.css";

/* ── Props ──────────────────────────────────────────────────── */

interface GroupRoomSheetProps {
  readonly onClose: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function GroupRoomSheet({ onClose }: GroupRoomSheetProps) {
  const [room, setRoom] = useState<TripRoom | null>(null);
  const [copied, setCopied] = useState(false);

  /* ── Access check ────────────────────────────────────────── */

  const isProGated =
    isGroupTripFlagEnabled("enable_group_room_pro_gate") &&
    GROUP_ROOM_ACCESS_MODE !== "free";

  const hasAccess = !isProGated || isProUnlocked();
  const canCreateMock =
    hasAccess && isGroupTripFlagEnabled("enable_mock_group_rooms");

  /* ── Analytics ───────────────────────────────────────────── */

  useEffect(() => {
    trackGroupRoomTeaserClicked();
    trackGroupRoomModalOpened();
  }, []);

  useEffect(() => {
    if (isProGated && !hasAccess) {
      trackGroupRoomPaywallViewed();
    }
  }, [isProGated, hasAccess]);

  /* ── Handlers ────────────────────────────────────────────── */

  const handleCreate = useCallback(() => {
    if (!canCreateMock) return;
    const newRoom = createMockTripRoom("You");
    setRoom(newRoom);
    trackGroupRoomMockCreated(newRoom.id);
  }, [canCreateMock]);

  const handleCopyInvite = useCallback(async () => {
    if (!room) return;
    const link = getMockInviteLink(room.id);
    trackInvitePlaceholderClicked(room.id);
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — degrade silently. */
    }
  }, [room]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const pricingLabel = useMemo(() => getGroupRoomPricingLabel(), []);
  const inviteLink = room ? getMockInviteLink(room.id) : "";

  return (
    <div className="grp-backdrop" onClick={handleBackdropClick}>
      <div
        className="grp-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Group Trip Room"
      >
        <div className="grp-handle">
          <div className="grp-handle-bar" />
        </div>

        <div className="grp-scroll">
          {/* Header */}
          <div className="grp-header">
            <div className="grp-badge">
              <IconUsers size={12} />
              Trip Room
            </div>
            <h2 className="grp-title">Plan with friends</h2>
            <p className="grp-subtitle">{GROUP_ROOM_DESCRIPTION}</p>
          </div>

          {/* Paywall */}
          {isProGated && !hasAccess ? (
            <div className="grp-paywall">
              <div className="grp-paywall-icon"><IconUsers size={32} /></div>
              <h3 className="grp-paywall-title">Group Trip Rooms</h3>
              <p className="grp-paywall-desc">
                {GROUP_ROOM_DESCRIPTION}
              </p>
              <p className="grp-paywall-price">{pricingLabel}</p>

              <div className="grp-ctas">
                <button
                  type="button"
                  className="grp-cta-primary"
                  disabled
                >
                  Coming soon
                </button>
                <button
                  type="button"
                  className="grp-cta-secondary"
                  onClick={onClose}
                >
                  Maybe later
                </button>
              </div>
            </div>
          ) : room ? (
            /* ── Room created view ──────────────────────────── */
            <>
              <div className="grp-created">
                <div className="grp-created-icon"><IconGlobe size={36} /></div>
                <h3 className="grp-created-title">{room.name}</h3>
                <p className="grp-created-desc">
                  Your Trip Room is ready. Share the invite link with
                  friends so they can add their preferences.
                </p>
              </div>

              {/* Members */}
              <div className="grp-members">
                <p className="grp-members-label">Members</p>
                {room.members.map((m) => (
                  <div key={m.id} className="grp-member">
                    <span className="grp-member-emoji">{m.emoji}</span>
                    <span className="grp-member-name">{m.displayName}</span>
                    {m.isHost && (
                      <span className="grp-member-badge">Host</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Invite link */}
              {isGroupTripFlagEnabled("enable_invite_placeholder") && (
                <div className="grp-invite">
                  <p className="grp-invite-label">Invite link</p>
                  <div className="grp-invite-row">
                    <div className="grp-invite-url">{inviteLink}</div>
                    <button
                      type="button"
                      className="grp-invite-copy"
                      onClick={handleCopyInvite}
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              )}

              <div className="grp-ctas">
                <button
                  type="button"
                  className="grp-cta-primary"
                  disabled
                >
                  {GROUP_ROOMS_COMING_SOON
                    ? "Full experience coming soon"
                    : "Start collecting preferences"}
                </button>
                <button
                  type="button"
                  className="grp-cta-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            /* ── Pre-creation view ──────────────────────────── */
            <>
              {/* Features */}
              <div className="grp-features">
                {GROUP_ROOM_FEATURES.map((f, i) => {
                  const featureIcons = [IconUsers, IconSliders, IconVote, IconRoute];
                  const FeatureIcon = featureIcons[i] ?? IconGlobe;
                  return (
                    <div key={f.label} className="grp-feature">
                      <span className="grp-feature-icon"><FeatureIcon size={16} /></span>
                      <div className="grp-feature-text">
                        <p className="grp-feature-label">{f.label}</p>
                        <p className="grp-feature-desc">{f.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pricing note */}
              <div className="grp-pricing">
                <p className="grp-pricing-label">{pricingLabel}</p>
              </div>

              {/* CTAs */}
              <div className="grp-ctas">
                <button
                  type="button"
                  className="grp-cta-primary"
                  onClick={handleCreate}
                  disabled={!canCreateMock && GROUP_ROOMS_COMING_SOON}
                >
                  {canCreateMock
                    ? "Create a Trip Room"
                    : "Coming soon"}
                </button>
                <button
                  type="button"
                  className="grp-cta-secondary"
                  onClick={onClose}
                >
                  Maybe later
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
