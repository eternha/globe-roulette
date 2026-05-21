# CLAUDE.md — globe-roulette

Project-specific operating notes. Extends `~/.claude/CLAUDE.md` and ECC rules; do not repeat generic guidance here.

## Stack

- Vite + React 19 + TypeScript (strict; check package.json for exact versions)
- Three.js via `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- Zustand for client state, Framer Motion for animation, Tailwind 4
- PostHog analytics, vite-plugin-pwa (service worker)
- Google Maps JS API (StreetView) — note: `loading=async` breaks `StreetViewService` constructor (see commit 2ad0bf7); do not re-add it
- Serverless endpoints in `api/` (affiliate redirect, affiliate metadata)

## Scripts & verification

| Command | Use |
|---|---|
| `npm run dev` | Local dev server (manual UI verification) |
| `npm run build` | `tsc -b && vite build` — type check + production build |
| `npm run lint` | ESLint flat config (TS + react-hooks + react-refresh) |
| `npm run preview` | Serve built output |
| `npx vitest run` | Run tests (no `test` script wired; only `src/lib/geo.test.ts` exists today) |

Before declaring work done: `npm run lint && npm run build`, plus `npx vitest run` if touching tested code. For UI changes, exercise the flow in `npm run dev` and say so explicitly — if you cannot, state that.

## Repository structure

```
api/                  Serverless functions (affiliate.ts, redirect.ts)
src/
  App.tsx, main.tsx
  components/         Feature folders: globe, arrow, result, packs, pro,
                      saved, group, itinerary, legal, ui
  hooks/              usePullGesture, useRouletteMachine, useSwipeToDismiss
  lib/                Pure utilities: geo, analytics, affiliate*, monetization,
                      posthog, proAccess, responsive, savedDestinations,
                      selectDestination, whyNow
  services/           groupTripService, itineraryService
  stores/             rouletteStore (Zustand)
  config/ data/ types/ styles/
public/               Static assets, PWA icons
.env.example          Required env vars reference
```

Organize new code by feature folder, not by file type. Keep `lib/` pure and testable.

## Coding conventions

- Explicit types on exported APIs and React props; no `React.FC`; `unknown` over `any`
- Immutable updates (spread, never mutate Zustand state in place)
- String-literal unions over enums
- Animate `transform` / `opacity` / `clip-path` only — never layout-bound properties
- Semantic HTML, design tokens via CSS custom properties where present
- No `console.log` in committed code; route through `lib/analytics.ts` or PostHog
- Secrets via `.env.local` only; reference `.env.example` for required keys
- Conventional commit prefixes match repo history: `feat:`, `fix:`, `perf:`, `chore:`, `docs:`

## Working rules (Karpathy)

1. **Think first** — state assumptions; if Maps/StreetView, monetization, or PWA behavior is in scope, ask before guessing. The codebase has known footguns (SW activation reload, Maps async loader, affiliate redirect contract).
2. **Simplicity** — match the existing feature-folder + small-lib + Zustand shape. No new state libraries, no premature abstractions.
3. **Surgical edits** — touch only what the task requires. Don't reformat, rename, or "improve" adjacent code. Remove only orphans your edits create.
4. **Goal-driven** — restate the task as a verifiable outcome, then verify with lint + build (and Vitest where applicable) before reporting done.

## Safety rules (non-negotiable)

- No `git push`, no force operations, no branch deletion
- No deploys (Vercel or otherwise), no production env mutations
- No new dependencies, dep upgrades, or `package.json` script changes without explicit approval
- No refactors unrelated to the requested task
- No edits to `.env.local`, `dist/`, `node_modules/`. Do not modify `package-lock.json` unless dependency/package changes were explicitly approved.
- No modifying CI, PWA service-worker behavior, or the Maps script tag without confirming the regression history first

## Testing expectations

- Vitest is installed but coverage is minimal (only `src/lib/geo.test.ts`). Do not claim 80% coverage applies retroactively.
- New pure logic in `lib/` or `services/` ships with a colocated `*.test.ts`.
- UI/Three.js work is verified manually in `npm run dev`; visual regression and Playwright E2E are not yet wired — say so rather than inventing checks.
- Bug fixes get a reproducing test when the surface is testable (pure functions, services). UI-only regressions get a written repro in the PR/commit body instead.
