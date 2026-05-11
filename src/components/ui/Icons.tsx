/**
 * Inline SVG icon set — consistent 16×16 stroke-based icons.
 *
 * All icons use currentColor so they inherit the parent's text color.
 * This replaces emoji usage throughout the app for a professional,
 * cohesive visual identity.
 */

interface IconProps {
  readonly size?: number;
  readonly className?: string;
}

const defaults: Required<Pick<IconProps, "size">> = { size: 16 };

/* ── Booking category icons ─────────────────────────────── */

export function IconPlane({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 3.5l-2 2-3.5-1-4.5 4.5 3.5 1.5 1.5 3.5 4.5-4.5-1-3.5 2-2a.7.7 0 0 0 0-1 .7.7 0 0 0-1 0z" />
      <path d="M4 12l-2.5 2.5" />
      <path d="M5.5 10.5l-3 1" />
      <path d="M5.5 10.5l1-3" />
    </svg>
  );
}

export function IconBed({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10V4.5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1V10" />
      <path d="M1 10h14v2H1z" />
      <path d="M2 12v1.5M14 12v1.5" />
      <circle cx="5" cy="6.5" r="1.2" />
      <path d="M8 9h5V7.5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1V9z" />
    </svg>
  );
}

export function IconCompass({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" />
      <polygon points="10.5,5.5 6.5,6.5 5.5,10.5 9.5,9.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconSim({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 1.5h4.5l3.5 3.5v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
      <rect x="6" y="7" width="4" height="5" rx="0.5" />
      <path d="M6 9.5h4M8 7v5" />
    </svg>
  );
}

export function IconShield({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5l5.5 2v4c0 3.5-2.5 5.8-5.5 7-3-1.2-5.5-3.5-5.5-7v-4L8 1.5z" />
      <path d="M6 8l1.5 1.5L10.5 6" />
    </svg>
  );
}

export function IconBus({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="11" height="9" rx="1.5" />
      <path d="M2.5 8.5h11" />
      <path d="M5 2.5V1M11 2.5V1" />
      <circle cx="5" cy="11" r="0.8" fill="currentColor" />
      <circle cx="11" cy="11" r="0.8" fill="currentColor" />
      <path d="M4 11.5v1.5M12 11.5v1.5" />
    </svg>
  );
}

export function IconCar({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 10h9a1.5 1.5 0 0 0 1.5-1.5v-1a1 1 0 0 0-.3-.7L12 5l-1.5-2.5H5.5L4 5 2.3 6.8a1 1 0 0 0-.3.7v1A1.5 1.5 0 0 0 3.5 10z" />
      <circle cx="4.5" cy="10.5" r="1.2" />
      <circle cx="11.5" cy="10.5" r="1.2" />
      <path d="M4 5h8" />
    </svg>
  );
}

/* ── Feature / teaser icons ─────────────────────────────── */

export function IconSparkle({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="currentColor" stroke="none">
      <path d="M8 1l1.3 4.2L13.5 6l-4.2 1.3L8 11.5 6.7 7.3 2.5 6l4.2-.8L8 1z" />
      <path d="M12 10l.6 1.8 1.9.7-1.9.5-.6 1.8-.6-1.8L9.5 12.5l1.9-.5L12 10z" opacity="0.6" />
    </svg>
  );
}

export function IconRoute({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4" cy="3.5" r="1.5" />
      <circle cx="12" cy="12.5" r="1.5" />
      <path d="M4 5v3a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V5" />
    </svg>
  );
}

export function IconUsers({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="4.5" r="2" />
      <path d="M1.5 13.5v-1a3.5 3.5 0 0 1 7 0v1" />
      <circle cx="11.5" cy="5" r="1.6" />
      <path d="M11.5 8.5a3 3 0 0 1 3 3v1" />
    </svg>
  );
}

export function IconGrid({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    </svg>
  );
}

/* ── Pack theme icons ──────────────────────────────────── */

export function IconHeart({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14s-5.5-3.5-5.5-7.5a3 3 0 0 1 5.5-1.7A3 3 0 0 1 13.5 6.5C13.5 10.5 8 14 8 14z" />
    </svg>
  );
}

export function IconSun({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" />
    </svg>
  );
}

export function IconUtensils({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 1.5v4a2 2 0 0 0 4 0v-4M6.5 5.5v9M12 1.5c0 2-1 3.5-1.5 5s0 3 0 3h1.5v5" />
    </svg>
  );
}

export function IconLaptop({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="3" width="11" height="7.5" rx="1" />
      <path d="M1 12.5h14" />
    </svg>
  );
}

export function IconGem({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2.5h8l3 4-7 8-7-8 3-4z" />
      <path d="M1 6.5h14M8 14.5l-2-8M8 14.5l2-8M4 2.5l2 4M12 2.5l-2 4" />
    </svg>
  );
}

export function IconMountain({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 13.5L6 4l2.5 4 1.5-2 4.5 7.5H1.5z" />
    </svg>
  );
}

export function IconUmbrella({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2a6 6 0 0 1 6 6H2a6 6 0 0 1 6-6z" />
      <path d="M8 8v5.5a1.5 1.5 0 0 1-3 0" />
    </svg>
  );
}

export function IconBolt({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 1.5L4 9h4l-1.5 5.5L13 7H9l.5-5.5z" />
    </svg>
  );
}

/* ── Mapping helper for booking categories ──────────────── */

const CATEGORY_ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  flights: IconPlane,
  hotels: IconBed,
  experiences: IconCompass,
  esim: IconSim,
  insurance: IconShield,
  transfers: IconBus,
  "car-rental": IconCar,
};

export function CategoryIcon({ category, ...props }: IconProps & { category: string }) {
  const Icon = CATEGORY_ICON_MAP[category];
  if (!Icon) return null;
  return <Icon {...props} />;
}

/* ── Group feature icons ────────────────────────────────── */

export function IconVote({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

export function IconSliders({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12M2 8h12M2 12h12" />
      <circle cx="5" cy="4" r="1.2" fill="currentColor" />
      <circle cx="10" cy="8" r="1.2" fill="currentColor" />
      <circle cx="7" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function IconLink({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 9.5a3 3 0 0 0 4.2.3l2-2a3 3 0 0 0-4.2-4.3l-1.2 1.1" />
      <path d="M9.5 6.5a3 3 0 0 0-4.2-.3l-2 2a3 3 0 0 0 4.2 4.3l1.1-1.1" />
    </svg>
  );
}

export function IconGlobe({ size = defaults.size, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M1.5 8h13M8 1.5c-2 2.3-2.5 4.2-2.5 6.5s.5 4.2 2.5 6.5c2-2.3 2.5-4.2 2.5-6.5S10 3.8 8 1.5z" />
    </svg>
  );
}
