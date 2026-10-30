# web-template

A minimal, production-ready starter for a server-rendered website: **Express 5** (ESM) + **EJS** + **Tailwind CSS 4** (local build, never CDN). No auth, no database, no bundler — add your own data layer.

Click **Use this template** to start a new project.

## Features

- Server-rendered pages with shared layout (`head` / `navbar` / `footer` partials)
- Active nav link highlighting (server-rendered `aria-current`, no JS needed)
- Mobile-friendly navbar with hamburger menu
- 404 / 500 error pages
- `/api/health` endpoint + `/api/*` rate limiting
- Request logging (console + rotating log files)
- Dark theme with custom scrollbar (Chrome + Firefox)
- `immutable` static caching with automatic cache-busting (`?v=assetVersion`)

## Prerequisites

- Node.js 20+

## Quickstart

```sh
cp .env.example .env
npm install
npm run build:css
npm run dev
```

Open http://localhost:3000. Production: `npm start`.

> After any EJS or class change, run `npm run build:css` and **restart** the server (`output.css` is served `immutable`, versioned at boot via `assetVersion`).

## Scripts

| Script          | What it does                                              |
| --------------- | --------------------------------------------------------- |
| `npm run dev`   | Start with `--watch` (auto-reload)                        |
| `npm start`     | Start in production mode                                  |
| `npm run build:css` | Build `public/css/output.css` (Tailwind 4 + cssnano) |
| `npm test`      | Run tests (`node --test`)                                 |

## Structure

```
server.js              # app entry: proxy, static, logging, routes, errors
config/constants.js    # PORT, SITE_URL, navLinks, locals(), proxy helpers
lib/logger.js          # file + console logger (LOG_LEVEL)
middleware/ratelimit.js# API rate limiter
routes/pages.js        # /, /about, /api/health
views/                 # partials/{head,navbar,footer}, pages/{home,about,404,500}
public/                # css/input.css (Tailwind theme), js/main.js (mobile menu)
```

## Customize

- **Site name / nav**: edit `SITE_NAME` and `navLinks` in `config/constants.js`
- **Theme**: Tailwind 4 tokens in `public/css/input.css` (`@theme`)
- **Pages**: add a route in `routes/pages.js` rendering `views/pages/*.ejs` with `{ ...locals(req), title }`
- **Images**: put them in `public/img/`; add `public/og.png` then set `ogImage` in `config/constants.js`
- **Config**: copy `.env.example` to `.env` — never commit secrets

## Notes

- `trust proxy` is preconfigured — required for correct IPs and rate limiting behind a reverse proxy.
- Request bodies are parsed with `inflate: false` (CVE-2026-111497, Node2Shell).
