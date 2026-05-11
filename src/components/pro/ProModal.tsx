import { useCallback, useEffect } from "react";
import {
  getProBenefits,
  getVisiblePlans,
  formatPrice,
  PRO_COMING_SOON,
} from "../../config/pro";
import {
  trackProModalOpened,
  trackProModalClosed,
  trackProCtaClicked,
} from "../../lib/analytics";
import { IconSparkle, IconSliders, IconUsers, IconRoute, IconGrid, IconCompass } from "../ui/Icons";
import "./pro-modal.css";

/* ── Props ──────────────────────────────────────────────────── */

interface ProModalProps {
  /** Where the modal was opened from (e.g. "teaser", "filter_gate") */
  readonly source: string;
  readonly onClose: () => void;
}

/* ── Component ──────────────────────────────────────────────── */

export function ProModal({ source, onClose }: ProModalProps) {
  const benefits = getProBenefits();
  const plans = getVisiblePlans();
  const primaryPlan = plans[0];

  /* ── Analytics ────────────────────────────────────────────── */

  useEffect(() => {
    trackProModalOpened(source);
  }, [source]);

  const handleClose = useCallback(() => {
    trackProModalClosed(source);
    onClose();
  }, [source, onClose]);

  const handleCtaClick = useCallback(() => {
    if (primaryPlan) {
      trackProCtaClicked(primaryPlan.id, source);
    }
    /* In coming-soon mode this is a no-op.
       When real payments are added, this triggers Stripe/Lemon Squeezy. */
  }, [primaryPlan, source]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose],
  );

  return (
    <div className="pro-backdrop" onClick={handleBackdropClick}>
      <div
        className="pro-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Travel Roulette Pro"
      >
        <div className="pro-handle">
          <div className="pro-handle-bar" />
        </div>

        <div className="pro-scroll">
          {/* Header */}
          <div className="pro-header">
            <div className="pro-badge">
              <IconSparkle size={12} className="pro-badge-icon" />
              Pro
            </div>
            <h2 className="pro-title">Travel Roulette Pro</h2>
            <p className="pro-subtitle">
              Unlock smart filters, group voting, AI itineraries,
              and premium destinations.
            </p>
          </div>

          {/* Benefits */}
          <div className="pro-benefits">
            {benefits.map((benefit, i) => {
              const benefitIcons = [IconSliders, IconUsers, IconRoute, IconGrid, IconCompass, IconSparkle];
              const BenefitIcon = benefitIcons[i] ?? IconSparkle;
              return (
                <div key={benefit.label} className="pro-benefit">
                  <span className="pro-benefit-icon"><BenefitIcon size={16} /></span>
                  <div className="pro-benefit-text">
                    <p className="pro-benefit-label">{benefit.label}</p>
                    <p className="pro-benefit-desc">{benefit.description}</p>
                  </div>
                  {!benefit.available && (
                    <span className="pro-benefit-soon">Soon</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pricing */}
          {primaryPlan && (
            <div className="pro-pricing">
              <div className="pro-price-row">
                <span className="pro-price">
                  {formatPrice(primaryPlan)}
                </span>
                <span className="pro-price-period">
                  {primaryPlan.period === "one-time"
                    ? "once"
                    : `/ ${primaryPlan.period}`}
                </span>
              </div>
              {primaryPlan.highlight && (
                <p className="pro-price-note">{primaryPlan.highlight}</p>
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="pro-ctas">
            <button
              type="button"
              className="pro-cta-primary"
              onClick={handleCtaClick}
            >
              {PRO_COMING_SOON ? "Coming soon" : "Upgrade to Pro"}
            </button>
            <button
              type="button"
              className="pro-cta-secondary"
              onClick={handleClose}
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
