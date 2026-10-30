import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import log from 'logxpert'

const __dirname = dirname(fileURLToPath(import.meta.url))

log.settings({
  level: process.env.LOG_LEVEL || 'info',
  console: { enableTimestamp: true, timestampFormat: 'YYYY-MM-DD HH:mm:ss' },
  files: {
    folder: join(__dirname, '..', 'logs'),
    prefix: 'app',
    maxFile: '14d',
    maxSize: '20m',
    runNumber: true,
    zippedArchive: true,
  },
})

export default log
