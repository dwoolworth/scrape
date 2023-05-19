import fs from 'fs'
import puppeteer from 'puppeteer'
import { connectDb } from './models/index.js'
import {
  closeGracefully,
  worker
} from './lib/index.js'
import {
  die,
  info,
  warn
} from './utils/index.js'
import config from './config/index.cjs'

(async () => {
  // Connect to the database
  try {
    await connectDb()
  } catch (error) {
    die(`>> could not connect to database: ${error}`)
  }

  // Setup shutdown signals
  process.on('SIGINT', closeGracefully)
  process.on('SIGTERM', closeGracefully)

  console.error(`>> config: ${JSON.stringify(config, null, 2)}`)

  info('** connected to database and setup signal handlers')

  try {
    while (true) {
      const headless = process.env.HEADLESS || 'new'
      const browser = await puppeteer.launch({
        headless,
        executablePath: fs.existsSync('/usr/bin/google-chrome')
          ? '/usr/bin/google-chrome'
          : undefined
      })
      try {
        await worker({ browser })
      } catch (error) {
        warn(`>> error occurred: ${error}, recycling browser`)
        await browser.close()
      }
    }
  } catch (error) {
    die(`>> error occurred: ${error}`)
  }
})()
