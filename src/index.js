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

  info('** connected to database and setup signal handlers')

  try {
    while (true) {
      const browser = await puppeteer.launch()
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
