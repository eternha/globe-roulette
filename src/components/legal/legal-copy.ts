/**
 * Static legal copy for footer modals.
 *
 * Keep each section as a plain object so the LegalModal
 * component can render them without parsing markdown.
 */

export interface LegalSection {
  readonly heading: string;
  readonly body: string;
}

/* ── Privacy Policy ─────────────────────────────────────────── */

export const PRIVACY_TITLE = "Privacy Policy";
export const PRIVACY_LAST_UPDATED = "May 2026";

export const PRIVACY_SECTIONS: readonly LegalSection[] = [
  {
    heading: "What we collect",
    body: "Travel Roulette runs entirely in your browser. We do not collect personal information, require accounts, or store data on our servers. Saved destinations are kept in your browser's local storage and never transmitted.",
  },
  {
    heading: "Analytics",
    body: "We may use privacy-friendly, cookie-free analytics (such as Plausible) to understand aggregate usage patterns. These tools do not track individual users, set cookies, or collect personal data.",
  },
  {
    heading: "Affiliate links",
    body: "When you click a booking link, you are taken to a third-party site (e.g. Booking.com, Kiwi.com). Those sites have their own privacy policies. We pass destination information in the URL but never share personal data with affiliate partners.",
  },
  {
    heading: "Local storage",
    body: "We store your saved destinations list in browser local storage. You can clear this data at any time through your browser settings.",
  },
  {
    heading: "Changes",
    body: "We may update this policy as the product evolves. Material changes will be noted with an updated revision date.",
  },
];

/* ── Terms of Use ───────────────────────────────────────────── */

export const TERMS_TITLE = "Terms of Use";
export const TERMS_LAST_UPDATED = "May 2026";

export const TERMS_SECTIONS: readonly LegalSection[] = [
  {
    heading: "The service",
    body: "Travel Roulette is a free tool that suggests travel destinations at random. It is provided for entertainment and inspiration only. We do not guarantee the accuracy, completeness, or timeliness of destination information.",
  },
  {
    heading: "Affiliate links",
    body: "Some links may direct you to third-party booking platforms. Any transaction you complete on those platforms is between you and the third-party provider. We are not a travel agency and do not sell travel services.",
  },
  {
    heading: "No warranty",
    body: 'The service is provided "as is" without warranties of any kind. We are not responsible for travel decisions made based on information shown in the app.',
  },
  {
    heading: "Intellectual property",
    body: "The Travel Roulette name, design, and code are our property. Destination data is curated for this project. You may share results freely but may not reproduce the app itself.",
  },
  {
    heading: "Changes",
    body: "We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms.",
  },
];

/* ── Affiliate Disclosure ───────────────────────────────────── */

export const AFFILIATE_DISCLOSURE_TITLE = "Affiliate Disclosure";
export const AFFILIATE_DISCLOSURE_LAST_UPDATED = "May 2026";

export const AFFILIATE_DISCLOSURE_SECTIONS: readonly LegalSection[] = [
  {
    heading: "How we earn revenue",
    body: "Travel Roulette participates in affiliate programs with travel booking platforms. When you click a booking link and complete a purchase, we may earn a small commission at no extra cost to you.",
  },
  {
    heading: "Our partners",
    body: "We work with established travel platforms including Kiwi.com (flights), Booking.com (hotels), GetYourGuide (experiences), Airalo (eSIM), SafetyWing (insurance), Bookaway (transfers), and DiscoverCars (car rental). This list may change over time.",
  },
  {
    heading: "Editorial independence",
    body: "Affiliate partnerships do not influence which destinations appear in the roulette. Destinations are selected randomly regardless of whether booking links are available. We only partner with services we consider reputable.",
  },
  {
    heading: "Why this matters",
    body: "Affiliate revenue helps keep Travel Roulette free. We believe in transparency about how the project sustains itself.",
  },
];
