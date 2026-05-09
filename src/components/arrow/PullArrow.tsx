import type { MachinePhase } from "../../data/types";
import "./pull-arrow.css";

interface PullArrowProps {
  /** 0 – 1 normalized pull strength */
  readonly pullStrength?: number;
  /** Pixel offset for the downward drag translation */
  readonly offsetY?: number;
  /** Whether the user is actively pulling */
  readonly isPulling?: boolean;
  /** Current phase of the state machine */
  readonly phase?: MachinePhase;
}

/**
 * Futuristic upward-pointing arrow with phase-driven visual feedback.
 *
 * idle:      gentle float, soft glow, light trails, expanding tip rings.
 * pulling:   float stops, arrow translates down, glow intensifies, charge bar.
 * launching: arrow flies upward off screen with a bright trail behind it.
 */
export function PullArrow({
  pullStrength = 0,
  offsetY = 0,
  isPulling = false,
  phase = "idle",
}: PullArrowProps) {
  const isLaunching = phase === "launching";
  const isVisible = phase === "idle" || phase === "pulling";

  const glowIntensity = 0.35 + pullStrength * 0.65;
  const chargeHeight = pullStrength * 64;
  const chargeOpacity = 0.3 + pullStrength * 0.7;
  const headGlowOpacity = 0.6 + pullStrength * 0.4;

  const containerClass = [
    "pull-arrow",
    isPulling ? "pull-arrow--pulling" : "",
    isLaunching ? "pull-arrow--launching" : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* Hide completely after launch finishes */
  if (!isVisible && !isLaunching) return null;

  return (
    <div
      className={containerClass}
      aria-hidden="true"
      style={{
        transform: isPulling ? `translateY(${offsetY}px)` : undefined,
        filter: isLaunching
          ? "drop-shadow(0 0 40px rgba(0, 219, 233, 1))"
          : `drop-shadow(0 0 ${12 + pullStrength * 20}px rgba(0, 219, 233, ${glowIntensity}))`,
      }}
    >
      {/* ambient glow behind the arrow */}
      <div
        className="pull-arrow__glow"
        style={
          isPulling
            ? {
                opacity: 0.5 + pullStrength * 0.5,
                transform: `scale(${1 + pullStrength * 0.6})`,
              }
            : undefined
        }
      />

      {/* light trail particles */}
      <div className="pull-arrow__trail" />
      <div className="pull-arrow__trail" />
      <div className="pull-arrow__trail" />

      {/* launch trail (only visible during launch) */}
      {isLaunching && (
        <>
          <div className="pull-arrow__launch-trail" />
          <div className="pull-arrow__launch-trail pull-arrow__launch-trail--wide" />
        </>
      )}

      {/* tip ring pulses */}
      <div className="pull-arrow__ring" />
      <div className="pull-arrow__ring" />

      <svg
        className="pull-arrow__svg"
        viewBox="0 0 44 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* shaft gradient: bright cyan at tip, fading down */}
          <linearGradient id="shaft-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00dbe9" stopOpacity="1" />
            <stop offset="60%" stopColor="#00dbe9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00dbe9" stopOpacity="0.08" />
          </linearGradient>

          {/* head gradient: white-hot center to electric cyan */}
          <linearGradient id="head-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0fcff" />
            <stop offset="50%" stopColor="#00dbe9" />
            <stop offset="100%" stopColor="#008fa0" />
          </linearGradient>

          {/* energy charge gradient (fills bottom→up while pulling) */}
          <linearGradient id="charge-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00dbe9" stopOpacity="0" />
            <stop offset="30%" stopColor="#00dbe9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e0fcff" stopOpacity="1" />
          </linearGradient>

          {/* glow filter for the arrowhead */}
          <filter id="head-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={isLaunching ? 5 : 2.5 + pullStrength * 2}
            />
          </filter>

          {/* charge bar glow */}
          <filter
            id="charge-glow"
            x="-200%"
            y="-10%"
            width="500%"
            height="120%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* ── shaft: tapered line ────────────────────────── */}
        <path
          d="M22 28 L22 92"
          stroke="url(#shaft-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* thin bright core line */}
        <path
          d="M22 28 L22 72"
          stroke="#00dbe9"
          strokeWidth={isLaunching ? 1.4 : 0.8}
          strokeLinecap="round"
          opacity={isLaunching ? 1 : 0.7 + pullStrength * 0.3}
        />

        {/* ── energy charge bar (visible while pulling) ───── */}
        {isPulling && chargeHeight > 0 && (
          <>
            {/* glow layer behind the charge */}
            <rect
              x="18"
              y={92 - chargeHeight}
              width="8"
              height={chargeHeight}
              rx="4"
              fill="url(#charge-grad)"
              filter="url(#charge-glow)"
              opacity={chargeOpacity * 0.5}
            />
            {/* crisp charge bar */}
            <rect
              x="20"
              y={92 - chargeHeight}
              width="4"
              height={chargeHeight}
              rx="2"
              fill="url(#charge-grad)"
              opacity={chargeOpacity}
            />
            {/* charge cap dot */}
            <circle
              cx="22"
              cy={92 - chargeHeight}
              r={1.5 + pullStrength}
              fill="#e0fcff"
              opacity={chargeOpacity}
            />
          </>
        )}

        {/* ── arrowhead glow layer (blurred behind) ──────── */}
        <path
          d="M22 2 L8 28 L16 26 L22 14 L28 26 L36 28 Z"
          fill="#00dbe9"
          filter="url(#head-glow)"
          opacity={isLaunching ? 1 : headGlowOpacity}
        />

        {/* ── arrowhead: sharp chevron ───────────────────── */}
        <path
          d="M22 4 L10 28 L17 25.5 L22 14 L27 25.5 L34 28 Z"
          fill="url(#head-grad)"
        />

        {/* hot-white tip accent */}
        <path
          d="M22 4 L19 16 L22 10 L25 16 Z"
          fill="#e8fdff"
          opacity={isLaunching ? 1 : 0.8 + pullStrength * 0.2}
        />

        {/* side edge highlights */}
        <line
          x1="10" y1="28" x2="17" y2="25.5"
          stroke="#5ef0f8"
          strokeWidth="0.5"
          opacity={0.6 + pullStrength * 0.4}
        />
        <line
          x1="34" y1="28" x2="27" y2="25.5"
          stroke="#5ef0f8"
          strokeWidth="0.5"
          opacity={0.6 + pullStrength * 0.4}
        />

        {/* shaft notch marks */}
        <line
          x1="20" y1="40" x2="24" y2="40"
          stroke="#00dbe9" strokeWidth="0.5"
          opacity={0.25 + pullStrength * 0.35}
        />
        <line
          x1="20" y1="50" x2="24" y2="50"
          stroke="#00dbe9" strokeWidth="0.5"
          opacity={0.18 + pullStrength * 0.32}
        />
        <line
          x1="20" y1="60" x2="24" y2="60"
          stroke="#00dbe9" strokeWidth="0.5"
          opacity={0.12 + pullStrength * 0.28}
        />
      </svg>
    </div>
  );
}
