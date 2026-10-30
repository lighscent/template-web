// Only these peers may set X-Forwarded-For: elsewhere req.ip stays the socket
// address. TRUSTED_PROXIES adds more front proxies (e.g. Cloudflare, nginx).
export const trustedProxies = [
  '127.0.0.0/8',
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16',
  ...(process.env.TRUSTED_PROXIES || '').split(',').map(s => s.trim()).filter(Boolean),
]

export function getClientIP(req) {
  const ip = req.ip
  return ip === '::1' || ip === '::ffff:127.0.0.1' ? '127.0.0.1' : ip
}

export const PORT = process.env.PORT || 3000
export const SITE_URL = process.env.SITE_URL || `http://localhost:${PORT}`
export const SITE_NAME = 'MySite'
export const DEFAULT_DESC = 'A minimal Express + EJS + Tailwind website.'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
]

export function locals(req) {
  return {
    path: req.path,
    navLinks,
    year: new Date().getFullYear(),
    params: req.query,
    siteUrl: SITE_URL,
    siteName: SITE_NAME,
    title: null,
    description: DEFAULT_DESC,
    ogImage: null, // set '/og.png' once public/og.png exists
    noindex: false,
  }
}
