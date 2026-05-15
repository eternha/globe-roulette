# Monetization Architecture

Globe Roulette's monetization is built in progressive phases, each
gated by feature flags and designed to layer on top of the core
experience without disrupting it.

## Principles

1. **The roulette is always random.** Sponsored deals, premium packs,
   and partner integrations never secretly bias the random destination
   selection. If a destination appears through sponsorship, it is
   clearly labeled.

2. **All sponsored content is disclosed.** Every sponsored placement
   carries a visible label: "Sponsored", "Partner", or "Sponsored
   Inspiration". There are no hidden ads.

3. **Feature flags control everything.** Every monetization surface
   has a master flag and child flags. Disabled by default unless
   explicitly turned on.

4. **Secret keys stay server-side.** Public affiliate/partner IDs
   can live in `VITE_` frontend env vars. Secret API keys must go
   through backend/serverless proxies and are never committed.

5. **The free experience is complete.** Monetization adds value —
   it does not gate the core spin-and-discover flow.

---

## Phase 1: Affiliate Monetization

**Status:** Active

Affiliate booking buttons in the result card. Each provider has a
public partner ID stored in a `VITE_` env var.

| Provider | Category | Env var |
|----------|----------|---------|
| Kiwi.com | Flights | `VITE_KIWI_AFFILIATE_ID` |
| Booking.com | Hotels | `VITE_BOOKING_AFFILIATE_ID` |
| GetYourGuide | Experiences | `VITE_GYG_PARTNER_ID` |
| Airalo | eSIM | `VITE_AIRALO_AFFILIATE_ID` |
| SafetyWing | Insurance | `VITE_SAFETYWING_AFFILIATE_ID` |
| Bookaway | Transfers | `VITE_BOOKAWAY_AFFILIATE_ID` |
| DiscoverCars | Car rental | `VITE_DISCOVERCARS_AFFILIATE_ID` |

**Files:**
- `src/config/monetization.ts` — provider registry
- `src/lib/affiliate.ts` — URL builders
- `src/lib/monetization.ts` — booking action helpers

**Flags:** `VITE_MONETIZATION_ENABLED` (master), `VITE_SHOW_AFFILIATE_LINKS`,
`VITE_SHOW_BOOKING_SECTION`, `VITE_SHOW_AFFILIATE_DISCLOSURE`

---

## Phase 2: Globe Roulette Pro

**Status:** Frontend-ready (coming soon mode)

Premium tier with smart filters, group voting, AI itineraries, and
premium destinations.

| Plan | Price | Period |
|------|-------|--------|
| Pro Lifetime | $4.99 | one-time |
| Pro Annual | $19.99 | year |

**Files:**
- `src/config/pro.ts` — plans, benefits, pricing
- `src/lib/proAccess.ts` — localStorage-based access check
- `src/components/pro/ProTeaser.tsx` — result card teaser
- `src/components/pro/ProModal.tsx` — upgrade modal

**Flags:** `VITE_ENABLE_PRO` (master), `VITE_ENABLE_PRO_TEASER`,
`VITE_ENABLE_PRO_MODAL`, `VITE_ENABLE_PAYMENT_PLACEHOLDER`, plus
per-feature gates for filters and packs.

---

## Phase 3: AI Itineraries

**Status:** Mock generation active

Day-by-day trip plans generated from destination data. Currently uses
deterministic mock generation. Ready for OpenAI/Anthropic integration
via `buildItineraryPrompt()`.

**Files:**
- `src/types/itinerary.ts` — types
- `src/config/itinerary.ts` — styles, durations, access mode
- `src/services/itineraryService.ts` — mock + prompt builder
- `src/components/itinerary/ItinerarySheet.tsx` — picker + result

**Flags:** `VITE_ENABLE_AI_ITINERARY` (master), `VITE_ENABLE_MOCK_ITINERARY`,
`VITE_ENABLE_AI_ITINERARY_PRO_GATE`, `VITE_ENABLE_ITINERARY_PURCHASE_PLACEHOLDER`

---

## Phase 4: Group Trip Rooms

**Status:** Frontend-ready (coming soon mode)

Shared rooms where friends collect preferences and vote on destinations.

**Files:**
- `src/types/groupTrip.ts` — room, member, preference, vote types
- `src/config/groupTrip.ts` — preference options, access mode
- `src/services/groupTripService.ts` — localStorage mock service
- `src/components/group/GroupRoomTeaser.tsx` — result card teaser
- `src/components/group/GroupRoomSheet.tsx` — room creation sheet

**Flags:** `VITE_ENABLE_GROUP_ROOMS` (master), `VITE_ENABLE_MOCK_GROUP_ROOMS`,
`VITE_ENABLE_GROUP_ROOM_PRO_GATE`, `VITE_ENABLE_GROUP_VOTING`,
`VITE_ENABLE_GROUP_PREFERENCE_MATCHING`, `VITE_ENABLE_INVITE_PLACEHOLDER`

---

## Phase 5: Sponsorship, Creator Packs & API Partners

**Status:** Architecture ready (all placements disabled by default)

### Sponsored Placements

Clearly labeled sponsored content slots. All disabled until a real
deal is signed.

| Placement type | Default |
|---------------|---------|
| `destination_of_the_week` | disabled |
| `sponsored_inspiration` | disabled |
| `partner_hotel_collection` | disabled |
| `sponsored_experience` | disabled |
| `travel_tool_partner` | disabled |
| `newsletter_partner` | disabled |

**Disclosure rule:** Every sponsored placement shows its `disclosureText`
field ("Sponsored", "Partner", or "Sponsored Inspiration") visibly.

**Files:**
- `src/types/sponsorship.ts` — placement types + feature flags
- `src/config/sponsorship.ts` — placement registry, disclosure copy

**Flags:** `VITE_ENABLE_SPONSORSHIP` (master), plus per-type flags.

### Destination Packs

Curated themed roulette collections. An optional alternative mode
that never changes the default random pool.

| Pack | Type | Premium |
|------|------|---------|
| Romantic Europe Roulette | editorial | no |
| Italian Summer Roulette | editorial | no |
| Foodie City Roulette | editorial | no |
| Digital Nomad Roulette | editorial | no |
| Luxury Escape Roulette | premium | yes |
| Adventure Roulette | editorial | no |
| Honeymoon Roulette | premium | yes |
| Beach Escape Roulette | editorial | no |
| Girls Trip Roulette | creator | no |
| Weekend Europe Roulette | editorial | no |

**Files:**
- `src/types/destinationPack.ts` — pack types + feature flags
- `src/config/destinationPacks.ts` — pack definitions
- `src/components/packs/PackTeaser.tsx` — "coming soon" teaser
- `src/components/packs/PackSheet.tsx` — pack grid preview

**Flags:** `VITE_ENABLE_DESTINATION_PACKS` (master), `VITE_ENABLE_CREATOR_PACKS`,
`VITE_ENABLE_PREMIUM_PACKS`, `VITE_ENABLE_PACK_TEASER`

### Future API Partners

Registry of planned API integrations with security classification.

| Partner | Category | Requires backend | Status |
|---------|----------|-----------------|--------|
| Kiwi.com | flights | no | active |
| Booking.com | hotels | no | active |
| GetYourGuide | experiences | no | active |
| Bookaway | transfers | no | active |
| DiscoverCars | car rental | no | active |
| Airalo | eSIM | no | active |
| SafetyWing | insurance | no | active |
| OpenWeatherMap | weather | yes | placeholder |
| Visa API | visa | yes | placeholder |
| ExchangeRate API | currency | yes | placeholder |
| Mapbox | maps | no (public token) | placeholder |
| OpenAI | AI itinerary | yes | planned |
| Anthropic | AI itinerary | yes | planned |
| Wikimedia | enrichment | no | placeholder |

**Security model:**
- `publicConfigAllowed: true` — affiliate/partner ID safe for `VITE_` env vars
- `publicConfigAllowed: false` — secret API key, must use backend proxy
- `requiresBackend: true` — needs Vercel Edge Function, Cloudflare Worker, or API server

**Files:**
- `src/types/apiPartner.ts` — partner types + security docs
- `src/config/apiPartners.ts` — partner registry

---

## Analytics Events

All monetization surfaces emit analytics events through the shared
adapter in `src/lib/analytics.ts`. Events batch every 5 seconds in
production and flush immediately to console in dev.

See `src/types/monetization.ts` for the `AnalyticsEventType` union
listing all tracked events.

---

## Roulette Integrity

The random destination selection in `src/lib/selectDestination.ts`
is never modified by monetization code. Sponsored or premium
destinations only appear through clearly labeled, opt-in surfaces
(packs, teasers, sponsored cards) — never by silently weighting
the random selection.
