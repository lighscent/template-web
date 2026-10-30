import 'dotenv/config'
import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import compression from 'compression'
import morgan from 'morgan'
import { statSync } from 'fs'
import { PORT, locals, trustedProxies } from './config/constants.js'
import { apiLimiter } from './middleware/ratelimit.js'
import setupPages from './routes/pages.js'
import logger from './lib/logger.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.set('trust proxy', trustedProxies)
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))
app.locals.assetVersion = (() => {
  try { return Math.floor(statSync(join(__dirname, 'public/css/output.css')).mtimeMs).toString(36) }
  catch { return '0' }
})()
app.use(compression())
app.use(express.static(join(__dirname, 'public'), { maxAge: '1y', immutable: true }))
// CVE-2026-111497 (Node2Shell): never hand a request body to the bundled brotli decoder
app.use(express.json({ inflate: false }))

morgan.format('custom', (tokens, req, res) => {
  const ts = new Date().toISOString().slice(5, 19).replace('T', '_')
  return [`[${ts}]`, tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), tokens['response-time'](req, res), 'ms'].join(' ')
})
app.use(morgan('custom', { stream: { write: (msg) => logger.info(msg.trim()) } }))

app.use('/api', apiLimiter)

setupPages(app)

app.use((req, res) => res.status(404).render('pages/404', locals(req)))
app.use((err, req, res, next) => {
  logger.error(req.method + ' ' + req.path + ' failed: ' + (err.stack || err.message || err))
  res.status(500).render('pages/500', locals(req))
})

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`)
})
