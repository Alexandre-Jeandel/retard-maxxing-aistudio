# retardmaxxing.app · landing page

V2 retardmaxxing landing page. Captures organic Google search traffic for the keyword "retardmaxxing" and converts to email waitlist.

Brutalist amber-on-black, JetBrains Mono everywhere, lowercase voice. No em-dashes. No "wellness" or "discipline" copy. No pricing on page.

Sister project: `thealtar.quest` (V1 gamified variant) lives in a separate codebase but shares the same backend / waitlist DB. The `subscribers` table has a `source` column populated from the request `Host` header so you can A/B compare conversion rates.

## Stack

- React 19 + Vite 6 + TypeScript
- Tailwind 4 (config in `src/index.css`, no separate `tailwind.config.js`)
- Express + better-sqlite3 backend (`server.ts`)
- DB: `data/waitlist.db` (auto-created)

## Run locally

```bash
npm install
npm run dev    # tsx server.ts, vite middleware in dev, port 3000
```

Visit `http://localhost:3000`.

## Build & deploy

```bash
npm run build  # vite build + esbuild bundles server.ts
npm run start  # node dist/server.js, serves /dist as static + /api routes
```

Deployed on the SSDNodes VPS. See infra notes elsewhere.

## Page structure

1. Top bar: wordmark + live count
2. Hero: "stop thinking." + verdict widget (hardcoded LUT, no LLM call)
3. Tomorrow's quest preview: one example, deterministic per day
4. How it goes: regret-arc story block
5. Three columns: what the app does
6. Email capture + milestone scarcity bar (10 → 25 → 50 → 100 → 250 → 500 → 1000)
7. Quotes block: audience self-recognition
8. Footer

## Key design rules

- Lowercase everywhere. No em-dashes. No corporate AI slop.
- No pricing on the landing page. Early-access framing only.
- No "AI mentor" copy on this variant. Picks a fight with Long's "don't rely on AI" rule.
- Verdict widget is a keyword-matched LUT in `src/data/verdicts.ts`. Free, no API.
- Quest preview pulls from `src/data/quests.ts` (curated subset). Deterministic per calendar day.

## API

- `POST /api/subscribe` body `{ email }` returns 200 `{ success: true }`. Rate-limited 5/15 min/IP. Stores `email` + `source` (derived from `req.headers.host`).
- `GET /api/subscriber-count` returns `{ count: <int> }`.

## Source data

Market research lives at the workspace level. See `260506-polished-ridge/research/FULL_REPORT.md` for the full positioning rationale behind every page section.
