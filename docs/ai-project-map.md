# Globe Roulette — AI Project Map

A factual, source-backed orientation for AI agents and new contributors. Optimised for fast cold reads. Pair with `CLAUDE.md` (operating rules) and `MONETIZATION.md` (revenue strategy).

## 1. Project overview

Globe Roulette is a single-page web app that lets a user "pull and release" a 3D globe to land on a random curated travel destination. After impact, the user gets a result card with highlights, "why now", Street View embed, AI-style itinerary, and affiliate booking links. A Pro tier and themed "destination packs" are scaffolded in config but mostly gated behind feature flags. See `src/data/destinations.ts` (1,000+ entries), `src/components/result/ResultCard.tsx`, and `MONETIZATION.md`.

## 2. Runtime architecture

- **Build/runtime:** Vite 8 + React 19 + TypeScript (strict). PWA via `vite-plugin-pwa` (`vite.config.ts`, `registerType: "autoUpdate"`, precache limit raised to 4 MB for the Three.js bundle, textures globbed in).
- **Entry:** `index.html` → `src/main.tsx` → `<App />`. Heavy SEO/OG/PWA metadata lives in `index.html`.
- **Rendering layers:**
  - WebGL canvas — `src/components/globe/GlobeScene.tsx` mounts an R3F `Canvas` with `Earth`, `Atmosphere`, `Clouds`, `EarthGlow`, `SpaceBackground`, `Projectile`, `DestinationMarker`, `CameraRig`.
  - HTML overlay — `src/App.tsx` renders a fixed-position flex column with header (title + Saved button), the `PullArrow` gesture surface, and hint text.
  - Lazy-loaded sheets/modals via `React.lazy` + `Suspense`: `ResultCard`, `SavedPanel`, `SiteFooter`. Other sheets (`HighlightSheet`, `PackSheet`, `ProModal`, `ItinerarySheet`, `GroupRoomSheet`, `LegalModal`) live under `src/components/<feature>/`.
- **Styling:** Tailwind 4 (via `@tailwindcss/vite`) plus colocated feature CSS files (e.g. `result-card.css`, `itinerary-sheet.css`). Design tokens via CSS custom properties (`--color-*`, `--space-margin-edge`).
- **Service worker:** `vite-plugin-pwa` `autoUpdate`. Known footgun: the SW activation reload was previously skipped on first install (see commit `4502994`); do not "fix" without re-reading that history.

## 3. State and flow

### Roulette state machine — `src/hooks/useRouletteMachine.ts`

A `useReducer` finite-state machine with phases `idle → pulling → launching → impact → landed → result` (plus `GOTO_DESTINATION` shortcut to `result`). Events: `START_PULL`, `UPDATE_PULL`, `RELEASE`, `LAUNCH_COMPLETE`, `IMPACT_COMPLETE`, `REVEAL`, `RESET`, `GOTO_DESTINATION`. Reducer enforces transition guards (e.g. `RELEASE` below `MIN_LAUNCH_STRENGTH = 0.15` snaps back to `idle`). Side-effect `useEffect`s:

- Mirror machine state into `rouletteStore` for R3F frame-loop reads.
- On `idle → launching`, pick a destination via `selectRandomDestination`, compute target Y rotation from `lngToGlobeRotationY` plus `DRAMATIC_SPIN_REVOLUTIONS = 2`, set `launchStartTime = performance.now()`, and schedule `LAUNCH_COMPLETE` via `setTimeout(LAUNCH_DURATION_MS = 2200)` (not `rAF` — comment explains tab-visibility behaviour).
- On `impact`, schedule `IMPACT_COMPLETE` after `IMPACT_HOLD_MS = 800`.
- On `GOTO_DESTINATION`, steer the globe to the nearest equivalent rotation (no dramatic spin).

### Pull gesture — `src/hooks/usePullGesture.ts`

Pointer-event driven, returns `{ ref, onPointerDown, style }`. Wired in `App.tsx`; calls `onStart`/`onMove(pullStrength, offsetY)`/`onRelease` which dispatch into the machine.

### Ref-based store — `src/stores/rouletteStore.ts`

A mutable singleton object (not Zustand, despite `zustand` being in `package.json`) used to share transient state between React (HTML overlay) and R3F frame loops. Exposes `getState()`, plus typed setters (`setPhase`, `setPullStrength`, `setLaunchProgress`, `setEarthRotationY`, `setTargetRotationY`, …) and `reset()`. **Mutates in place** — by design, no subscribers, R3F components poll via `useFrame`. This conflicts with the immutability principle in the global ECC rules; treated as an intentional perf exception (see Risks §10).

### Deep links

`App.tsx` reads `?dest=<id>` on mount; after an 800 ms delay (so the globe scene mounts), it dispatches `GOTO_DESTINATION` and replaces the URL. Idempotent via `deepLinkHandled` ref to survive React 19 strict-mode double-invoke.

### Saved destinations

`src/lib/savedDestinations.ts` persists `{ id, savedAt }[]` in `localStorage` under `travel-roulette-saved`. `SavedPanel` consumes it and emits `onSelectDestination` to drive `GOTO_DESTINATION`.

## 4. Data and config layout

- `src/data/destinations.ts` — readonly array of `Destination` (id, name, country, lat/lng, copy fields, `vibe`, `highlights`, `tier`, `continent`). Roughly 1,000+ entries; the canonical product dataset.
- `src/data/highlightDetails.ts` and `src/data/highlights/` — supplemental copy for `HighlightSheet`.
- `src/data/types.ts` — shared domain types including `MachinePhase`, `Destination`, `DestinationTier`.
- `src/config/features.ts` — `VITE_*` env-driven boolean flags for monetization, Pro, itinerary, group trip, sponsorship, destination packs. Defaults vary by group; each group has a master flag that gates its children:
  - **Monetization** (`monetization_enabled` and children `show_affiliate_links`, `show_booking_section`, `show_affiliate_disclosure`, `show_sponsored_placements`) — all default `false`.
  - **Pro** (`enable_pro` and children) — `enable_pro`, `enable_pro_teaser`, `enable_pro_modal`, `enable_payment_placeholder` default `true`; `enable_budget_filters`, `enable_season_filters`, `enable_vibe_filters`, `enable_premium_destination_packs` default `false`.
  - **Itinerary** (`enable_ai_itinerary` and children `enable_mock_itinerary`, `enable_ai_itinerary_pro_gate`, `enable_itinerary_purchase_placeholder`) — all default `true`.
  - **Group rooms** (`enable_group_rooms` and children) — `enable_group_rooms`, `enable_mock_group_rooms`, `enable_group_room_pro_gate`, `enable_group_voting`, `enable_invite_placeholder` default `true`; `enable_group_preference_matching` defaults `false`.
  - **Sponsorship** (`enable_sponsorship` and all children) — all default `false`.
  - **Destination packs** (`enable_destination_packs`, `enable_creator_packs`, `enable_premium_packs`) default `false`; `enable_pack_teaser` defaults `true` and is independent of the pack master flag (it can show a "coming soon" teaser even when packs are off).
- `src/config/monetization.ts` — affiliate provider registry (`kiwi`, `klook`, `tiqets`, `kiwitaxi`, `yesim`, `ekta`, `getrentacar`) grouped by category, plus category metadata.
- `src/config/pricing.ts` — inert tier pricing placeholders (no runtime effect today).
- `src/config/pro.ts` — Pro plan catalogue (`pro_lifetime`, `pro_annual`, `itinerary_pack`, `group_trip_room`).
- `src/config/destinationPacks.ts` — themed pack scaffolding (editorial / creator / premium / sponsored / seasonal). Most packs currently `enabled: false` with empty `destinationIds`.
- `src/config/apiPartners.ts` — registry of planned/active API partners; documents which require backend secrets vs public IDs.
- `src/config/sponsorship.ts`, `src/config/groupTrip.ts`, `src/config/itinerary.ts` — feature-specific config (styles, emojis, copy).
- `src/types/` — domain types for monetization, itinerary, groupTrip, sponsorship, destinationPack, apiPartner.

## 5. Library layer (`src/lib/`)

Pure utilities; treat as the testable surface.

| File | Purpose |
|---|---|
| `geo.ts` | `latLngToVector3`, `lngToGlobeRotationY`, `latToCameraPolar`, `angularDistance`. **Tested** in `geo.test.ts`. |
| `selectDestination.ts` | Random destination picker that avoids repeating the previous choice. |
| `whyNow.ts` | "Why visit now" copy generation helpers. |
| `affiliate.ts` | Per-provider URL builders, all currently pointing at `tpk.mx` Travelpayouts short links, gated on feature flags via `getProvider`. |
| `affiliateProxy.ts` | Client-side wrapper that calls `/api/affiliate` to enrich URLs server-side. |
| `monetization.ts` | High-level `getBookingActions(dest)` API consumed by `ResultCard`. Cross-checks `isMonetizationActive()` and `show_affiliate_links`. |
| `analytics.ts` | Adapter-pattern event sink. Default no-op; `setAnalyticsAdapter` swaps in PostHog. Queues events and flushes every 5 s in prod. |
| `posthog.ts` | `initPostHog()` reads `VITE_POSTHOG_KEY` / `VITE_POSTHOG_HOST` (defaults to `https://eu.i.posthog.com`), `autocapture: false`, `person_profiles: "identified_only"`, then registers the PostHog adapter into `analytics.ts`. |
| `proAccess.ts` | localStorage-backed Pro unlock state under `travel-roulette-pro`. Explicitly placeholder for a real payment provider. |
| `savedDestinations.ts` | localStorage CRUD for saved destinations. |
| `responsive.ts` | Viewport/device helpers. |

## 6. Services (`src/services/`)

- `itineraryService.ts` — Mock itinerary generator + `buildItineraryPrompt(destination, options)` ready to hand off to an LLM API. No real network calls today.
- `groupTripService.ts` — In-memory + `localStorage` (`tr_group_rooms`) implementation of group rooms, votes, and matches. No backend, no auth, no real-time; explicit TODOs document the swap-to-API path.

## 7. Serverless surface (`api/`)

Vercel functions, untyped req/res (`req: any`):

- `api/affiliate.ts` — `POST /api/affiliate` with `{ urls: string[] }`. Calls Travelpayouts `https://api.travelpayouts.com/v1/links` with `X-Access-Token: TRAVELPAYOUTS_API_TOKEN`, `marker = TRAVELPAYOUTS_MARKER ?? "528922"`, `trs = TRAVELPAYOUTS_TRS`. On missing creds, network error, or non-200, **returns the original URLs unchanged** (graceful degradation). Permissive `Access-Control-Allow-Origin: *`.
- `api/redirect.ts` — `GET /api/redirect?url=<encoded>` validates the URL is `http(s)`, resolves to a Travelpayouts affiliate URL server-side, and issues a 302. Designed to bypass popup blockers / blank-tab UX. Same fallback semantics as `affiliate.ts`. Logs conversions to stdout.

Env vars (server-side only — do not expose with `VITE_`): `TRAVELPAYOUTS_API_TOKEN`, `TRAVELPAYOUTS_TRS`, optional `TRAVELPAYOUTS_MARKER`.

## 8. Public assets, SEO, PWA

`public/`:

- PWA: `manifest.json`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, favicons.
- SEO: `og-image.{png,webp,svg}`, `robots.txt`, `sitemap.xml`, `humans.txt`.
- AI discoverability: `llms.txt` (read this before adding new top-level features so the file stays accurate).
- Three.js assets: `textures/` (earth, normal, clouds) and `fonts/`.

`index.html` carries the full SEO/OG/Twitter card stack and `theme-color: #00dbe9`. Note: the Google Maps JS API tag must **not** carry `loading=async` — see commit `2ad0bf7` and `CLAUDE.md` §Stack. StreetView is mounted in `src/components/result/StreetViewEmbed.tsx`.

## 9. Developer commands (`package.json`)

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server. Required for manual UI verification of globe / gesture / sheets. |
| `npm run build` | `tsc -b && vite build`. Use as primary CI-style check. |
| `npm run lint` | ESLint flat config (`eslint.config.js`) — `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`. |
| `npm test` | `vitest run`. Currently only `src/lib/geo.test.ts` exists. |
| `npm run preview` | Serve the production build. |

Mandatory pre-completion checks for code-changing work: `npm run lint && npm run build`, plus `npm test` if touched logic is testable. UI/3D work additionally needs `npm run dev` exercise — if not done, state so explicitly.

## 10. Test strategy

### Current state

- Vitest is installed; one suite (`src/lib/geo.test.ts`, 4 describes, ~10 cases) covers geographic math (`latLngToVector3`, `lngToGlobeRotationY`, `latToCameraPolar`, `angularDistance`). No other tests are wired.
- No Playwright / Storybook / visual-regression / coverage gates configured. Do **not** claim 80 % coverage applies retroactively (`CLAUDE.md` §Testing).

### Suggested unit targets (high ROI, pure functions)

- `src/lib/selectDestination.ts` — no-repeat property under random seeds.
- `src/lib/whyNow.ts` — deterministic copy generation per input.
- `src/lib/affiliate.ts` — builder gating on `getProvider`; assert `null` when feature flag off.
- `src/lib/monetization.ts` — `getBookingActions` returns empty when `monetization_enabled` is off.
- `src/lib/savedDestinations.ts` and `src/lib/proAccess.ts` — localStorage round-trips with mocked storage.
- `src/lib/analytics.ts` — queue flushing, adapter swap, no-op default.

### Suggested integration targets

- `src/hooks/useRouletteMachine.ts` — reducer transitions and `useEffect` side effects (mock `setTimeout`, assert `rouletteStore` writes). State machine is the core product loop.
- `src/services/groupTripService.ts` and `itineraryService.ts` — mock localStorage / pure builders.
- `api/affiliate.ts` and `api/redirect.ts` — node-side handler tests with `fetch` stubbed; verify fallback-to-original-URL semantics under missing creds and 5xx upstream.

### Suggested E2E / UI checks

- Playwright (per ECC TS testing rules) for: pull→release→result happy path, deep-link `?dest=`, Saved panel open/select, monetization OFF → no booking buttons, monetization ON → buttons render and `/api/affiliate` is hit.
- Manual / scripted render check for R3F scene: globe mounts without WebGL warnings, target rotation lands within `EPSILON` of `lngToGlobeRotationY` after `LAUNCH_DURATION_MS`.
- Mobile gesture: pointer-events from a real touch profile (iOS Safari, Android Chrome). 60 fps target on mid-tier mobile.

## 11. Risks

1. **Mutable singleton store vs. project immutability rule.** `src/stores/rouletteStore.ts` mutates in place and `package.json` carries `zustand` even though it is unused. Either (a) document the mutation as an explicit R3F perf carve-out in `CLAUDE.md`, or (b) port to a Zustand store with `subscribeWithSelector` and a frame-loop subscription pattern. Touching this is high-blast-radius — the launch animation timing depends on `useFrame` reads.
2. **Very thin test coverage.** Only `geo.ts` is tested. Reducer, store, gesture, monetization, services, and API handlers are uncovered. A single regression in `useRouletteMachine` reducer would ship silently.
3. **Analytics privacy and config.** `lib/posthog.ts` enables `capture_pageview` and `capture_pageleave` by default and runs as soon as `VITE_POSTHOG_KEY` is set. There is no visible cookie/consent banner gating it; verify GDPR posture before any EU launch. PostHog host defaults to EU, but consent is the gate, not region.
4. **Affiliate config risk.** Provider URLs are hard-coded `tpk.mx` short links in `src/lib/affiliate.ts`; rotating a link requires a code change + deploy. `marker = "528922"` is a server-side default but is also visible in repo. The `/api/affiliate` endpoint allows `Access-Control-Allow-Origin: *`, so anyone can POST URLs and consume your Travelpayouts quota — consider an allow-list of origins.
5. **3D / mobile performance.** R3F scene with atmosphere, clouds, postprocessing, and projectile + texture precache via SW (4 MB cap). LCP and INP are sensitive to texture size and shader compile; budget per ECC web `performance.md` (LCP <2.5 s, INP <200 ms). No bundle analysis is wired today.
6. **Google Maps loader footgun.** `loading=async` breaks `StreetViewService` (commit `2ad0bf7`). Any change to the Maps script tag must reference that commit; CI does not catch this regression.
7. **Service worker first-visit reload.** Commit `4502994` deliberately skips the reload on initial SW activation. `registerType: "autoUpdate"` is otherwise aggressive — verify behaviour after any `vite-plugin-pwa` upgrade.
8. **`api/*` handlers are `any`-typed and unbounded.** No rate limit, no input length cap on `urls`, no auth. Cheap upgrade: cap `urls.length`, validate each `url` with `new URL` + scheme check (the redirect handler does this; the affiliate handler does not).
9. **`localStorage`-backed Pro unlock and group rooms.** Trivially forgeable client-side. Anyone can set `travel-roulette-pro` to unlock features. Acceptable for the current "scaffold the UI" phase, blocker for real revenue.
10. **Feature-flag drift.** Many sheets/modals exist behind flags (`enable_pro`, `monetization_enabled`, sponsorship, destination packs). Flag combinations are not exercised in tests; UI regressions in OFF mode are easy to miss.

## 12. Suggested next docs / code-ownership map

- `docs/architecture.md` — diagram of the React overlay vs. R3F canvas vs. ref-store communication pattern, with a sequence diagram of the `idle → result` flow.
- `docs/monetization-runbook.md` — env-flag matrix (OFF / partial / full), expected UI under each, and `/api/affiliate` deployment checklist. Should also document the Travelpayouts marker rotation procedure.
- `docs/testing.md` — concrete first-pass test plan covering the reducer, `monetization.ts`, services, and the two API handlers, with mock patterns for `localStorage`, `setTimeout`, and `fetch`.
- `docs/privacy.md` — PostHog event inventory (from `lib/analytics.ts` + `lib/posthog.ts`), consent strategy, and retention.
- Code ownership (suggested CODEOWNERS pattern):
  - `src/components/globe/**`, `src/hooks/useRouletteMachine.ts`, `src/stores/rouletteStore.ts` → 3D/animation owner.
  - `src/lib/{affiliate,monetization,analytics,posthog,proAccess}.ts`, `api/**`, `src/config/{monetization,features,pro,apiPartners}.ts` → monetization owner.
  - `src/data/**`, `src/components/result/**`, `src/components/packs/**` → content/editorial owner.
  - `src/components/legal/**`, `public/{robots,sitemap,llms,humans}.txt`, `index.html` → SEO/legal owner.
