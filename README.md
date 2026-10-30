# web-template

Minimal Express 5 (ESM) + EJS + Tailwind 4 website. No auth, no database — add your own data layer.

To use as a GitHub template: push this folder as its own repository, then enable **Settings → Template repository**. New projects start with **Use this template**.

## Setup

```sh
cp .env.example .env
npm install
npm run build:css
npm run dev            # node --watch server.js
```

Production: `npm start`. Rebuild the CSS after any EJS/class change, then **restart** the server (`output.css` is served `immutable`, versioned at boot via `assetVersion`).

## Layout

- `server.js` — trust proxy, compression, static, JSON (no brotli inflate, CVE-2026-111497), morgan, `/api` rate limit, routes, 404/500
- `config/constants.js` — `PORT`, `SITE_URL`, `navLinks`, `locals(req)`, `getClientIP`, `trustedProxies`
- `lib/logger.js` — file + console logger (`LOG_LEVEL`)
- `middleware/ratelimit.js` — `apiLimiter`
- `routes/pages.js` — `/`, `/about`, `/api/health`
- `views/` — `partials/{head,navbar,footer}`, `pages/{home,about,404,500}`
- `public/` — `css/input.css` (Tailwind 4 theme, build local — never CDN), `js/main.js` (mobile menu)

## Next steps

- Put your images in `public/img/`, your Open Graph image at `public/og.png` (then set `ogImage` in `config/constants.js`)
- Add routes in `routes/`, nav entries in `config/constants.js` `navLinks`

