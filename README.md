# BusyBuddy

> Six lightweight conversion widgets that turn your storefront into a conversion machine — no code required.

BusyBuddy is a full-stack marketing/landing web app built from the original HTML
mockup (`docs/mockup.html`). It ships a **React + TypeScript + Vite + TailwindCSS**
frontend and a **Node + Express + TypeScript** backend, wired together in a single
npm-workspaces monorepo with a shared types package.

---

## Table of contents

- [Stack](#stack)
- [Repository layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [API](#api)
- [How it maps to the mockup](#how-it-maps-to-the-mockup)
- [Data store](#data-store)
- [Building for production](#building-for-production)
- [Deployment](#deployment)
- [Follow-ups](#follow-ups)

---

## Stack

| Layer    | Tech                                                              |
| -------- | ----------------------------------------------------------------- |
| Frontend | React 18, TypeScript, Vite 6, Tailwind CSS 3, React Router 6      |
| Backend  | Node 20+, Express 4, TypeScript, Zod (validation)                 |
| Shared   | TypeScript package with API contract + widget catalog types       |
| Tooling  | npm workspaces, ESLint 9 (flat config), Prettier, `tsx` (dev)     |

## Repository layout

```
busybuddy/
├── package.json          # npm workspaces root + orchestration scripts
├── .env.example          # sample env for backend + frontend
├── docs/
│   └── mockup.html       # original source-of-truth HTML mockup (reference)
├── shared/               # @busybuddy/shared — types + widget catalog
│   └── src/
│       ├── api.ts        # request/response contract types
│       ├── widgets.ts    # the 6-widget catalog (ported from the mockup)
│       └── index.ts
├── backend/              # @busybuddy/backend — Express API
│   └── src/
│       ├── server.ts     # entrypoint
│       ├── app.ts        # express app factory
│       ├── routes.ts     # /api/health, /api/widgets, /api/waitlist
│       ├── store.ts      # JSON-file datastore for leads
│       ├── validation.ts # Zod schema
│       └── config.ts     # env-driven config
└── frontend/             # @busybuddy/frontend — React SPA
    └── src/
        ├── pages/        # Home, Widgets, Pricing, Docs, Blog, GetStarted, NotFound
        ├── components/   # Nav, Footer, Layout, DevicePreview, WidgetCard, Icon
        └── lib/api.ts    # typed fetch client
```

## Prerequisites

- **Node.js ≥ 20** (developed and verified on Node 22/26)
- **npm ≥ 10** (workspaces)

## Quick start

```bash
# 1. Install all workspace deps (root install hoists everything)
npm install

# 2. Build the shared types package (frontend & backend consume its dist)
npm run build:shared

# 3. Copy env template (optional — sensible defaults are baked in)
cp .env.example .env

# 4. Run backend + frontend together (Vite proxies /api -> backend)
npm run dev
```

- Frontend dev server: <http://localhost:5173>
- Backend API: <http://localhost:3001>

The Vite dev server proxies `/api/*` to the backend, so no CORS setup is needed
during development.

> **Note:** run `npm run build:shared` once after install (and again if you edit
> `shared/`). The frontend and backend import `@busybuddy/shared` from its compiled
> `dist/`.

## Environment variables

See [`.env.example`](./.env.example). All are optional — defaults work out of the box.

| Variable            | Default                  | Used by  | Description                                   |
| ------------------- | ------------------------ | -------- | --------------------------------------------- |
| `PORT`              | `3001`                   | backend  | API listen port                               |
| `CORS_ORIGIN`       | `http://localhost:5173`  | backend  | Comma-separated allowed origins               |
| `DATA_DIR`          | `backend/data`           | backend  | Directory for the JSON datastore              |
| `VITE_API_BASE_URL` | _(empty → dev proxy)_    | frontend | Absolute API base URL for production frontend |

## Scripts

Run from the repo root:

| Script                   | What it does                                              |
| ------------------------ | -------------------------------------------------------- |
| `npm run dev`            | Runs backend + frontend concurrently                     |
| `npm run dev:backend`    | Backend only (`tsx watch`)                               |
| `npm run dev:frontend`   | Frontend only (Vite)                                     |
| `npm run build`          | Builds shared → backend → frontend                       |
| `npm run build:shared`   | Compiles the shared types package                        |
| `npm run typecheck`      | `tsc --noEmit` across all workspaces                     |
| `npm run lint`           | ESLint across all workspaces                             |
| `npm run format`         | Prettier write                                           |
| `npm run format:check`   | Prettier check (CI-friendly)                             |

Backend production start: `npm run start --workspace backend` (after `npm run build`).

## API

Base path: `/api`

| Method | Path             | Description                                    |
| ------ | ---------------- | ---------------------------------------------- |
| `GET`  | `/api/health`    | Liveness + uptime + timestamp                  |
| `GET`  | `/api/widgets`   | Widget catalog metadata (count + ids)          |
| `POST` | `/api/waitlist`  | Validate + persist a waitlist / contact lead   |

**`POST /api/waitlist`** request body:

```json
{
  "name": "Ada Merchant",
  "email": "ada@store.com",
  "storeUrl": "https://yourstore.com",
  "interestedWidgetId": "bundle",
  "message": "optional note"
}
```

Success (`201`):

```json
{ "ok": true, "data": { "id": "…", "createdAt": "…", "name": "…", "email": "…" } }
```

Validation error (`400`):

```json
{ "ok": false, "error": "Validation failed", "fields": { "email": "A valid email is required" } }
```

All request/response shapes are defined once in `@busybuddy/shared` and imported by
both sides, so the wire contract can't drift.

## How it maps to the mockup

The original mockup (`docs/mockup.html`) is a single-page hero with an interactive
widget selector. Everything was ported to real React + routing:

| Mockup element                              | Production implementation                                    |
| ------------------------------------------- | ------------------------------------------------------------ |
| Pill nav + logo + "Get Started" CTA         | `components/Nav.tsx` (React Router `NavLink`, mobile menu)    |
| Huge `POWER/UP YOUR/STORE` hero type        | `pages/Home.tsx` with the `.huge` Archivo Black treatment    |
| Center desktop + mobile device previews     | `components/DevicePreview.tsx`                                |
| 3 floating blurbs that swap per widget      | `pages/Home.tsx` (driven by selected widget state)           |
| 6 hover/click widget cards                  | `components/WidgetCard.tsx` — hover to preview, click to open |
| Inline `<script>` widget data + `select()`  | `shared/src/widgets.ts` catalog + React state                |
| "Explore Widgets" / "Get Started" buttons   | Wired to real routes (`/widgets`, `/get-started`)            |
| _(new)_ full pages behind every nav link    | Widgets, Pricing, Docs, Blog, Get Started, 404               |
| _(new)_ working lead form                   | `pages/GetStarted.tsx` → `POST /api/waitlist`                |
| _(new)_ live API status widget              | `pages/Docs.tsx` → `GET /api/health`                         |

Theme colors (`--bg #eef1f2`, `--ink #0b0b0b`, accent `#ff6a1a`) and fonts
(Inter + Archivo Black) are reproduced via Tailwind theme tokens and the Google
Fonts link. The layout is art-directed (absolute) on `xl` screens to match the
mockup and reflows to a responsive stacked layout below it.

## Data store

Waitlist submissions are persisted to a JSON file at `DATA_DIR/waitlist.json`
(default `backend/data/waitlist.json`) via a small typed store with a serialized
write lock. This is a deliberate, documented simplification — see Follow-ups for
the production database path. The data directory is git-ignored (except a
`.gitkeep`).

## Building for production

```bash
npm install
npm run build          # shared → backend → frontend
# Frontend static output: frontend/dist/
# Backend compiled output: backend/dist/  (run: npm run start --workspace backend)
```

## Deployment

- **Frontend** (`frontend/dist`) is static — deploy to any static host / CDN
  (Netlify, Vercel, Cloudflare Pages, S3+CloudFront, Nginx). Set
  `VITE_API_BASE_URL` at build time to point at the deployed API, and configure a
  SPA fallback (rewrite all routes to `index.html`) so client-side routing works.
- **Backend** (`backend/dist`) runs as a Node service (`node dist/server.js`).
  Deploy to Render/Railway/Fly/a container. Set `PORT`, `CORS_ORIGIN` (your
  frontend origin), and a persistent `DATA_DIR` (or swap in a real DB).

## Follow-ups

- Swap the JSON-file store for a real database (Postgres/Prisma or Mongo) behind
  the existing `WaitlistStore` interface.
- Add automated tests (Vitest for frontend, supertest for the API).
- Add CI (typecheck + lint + build) via GitHub Actions.
- Rate-limiting / spam protection (e.g. hCaptcha) on `POST /api/waitlist`.
- Real content for Docs/Blog (currently representative sample content) and
  authenticated merchant dashboard.
```
