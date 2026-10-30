# AGENTS.md

Minimal Express 5 ESM + EJS + Tailwind 4 website. No auth, no sessions, no database.

## Commands

```sh
npm run dev        # node --watch server.js
npm start          # production
npm run build:css  # postcss public/css/input.css -o public/css/output.css (Tailwind 4 + cssnano, output.css gitignored)
npm test           # node --test
```

PowerShell: chain with `;` (not `&&`). No lint/typecheck — verification is `run the service`.

## Conventions

- Node ESM (`import` + explicit extensions). No bundler, vanilla JS in `public/js/`.
- New pages: route in `routes/pages.js` rendering `views/pages/*.ejs` with `{ ...locals(req), title }`; nav entries in `config/constants.js` `navLinks`. Active link is server-rendered (`aria-current` + CSS in `input.css`).
- Styling: Tailwind 4 tokens in `public/css/input.css` (`@theme`); rebuild CSS after any EJS/class change, then **restart** (output.css served `immutable`, `assetVersion` computed at boot).
- `.env` is gitignored; copy `.env.example`. Never put secrets in tracked files.
- `trust proxy` is set — required for `express-rate-limit` behind a reverse proxy.
