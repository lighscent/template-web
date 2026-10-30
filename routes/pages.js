import { locals } from '../config/constants.js'

export default function (app) {
  app.get('/', (req, res) => {
    res.render('pages/home', { ...locals(req), title: 'Home' })
  })

  app.get('/about', (req, res) => {
    res.render('pages/about', { ...locals(req), title: 'About' })
  })

  app.get('/api/health', (req, res) => {
    res.json({ ok: true })
  })
}
