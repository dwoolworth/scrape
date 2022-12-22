import puppeteer from 'puppeteer'
import { connectDb } from './models/index.js'
import {
  closeGracefully,
  getAnchorRefs,
  saveAnchorRef
} from './lib/index.js'
import { die, info, warn } from './utils/index.js'

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

  info('>> connected to database and setup signal handlers')

  // Set starting URL
  const startingUrl = 'https://lassoedapp.com/'

  // Start process
  const browser = await puppeteer.launch()

  // Get top record from database that has status = 'new'

  // Use axios request

  // Pages
  const pages = await browser.pages();
  const page = pages.length
    ? pages[0]
    : die('>> no pages re open in browser')
  const startingURL = new URL(startingUrl)
  const startingHost = startingURL.hostname
  await page.setViewport({ width: 1920, height: 2060, deviceScaleFactor: 1 })

  // Retrieve webpage
  await page.goto(startingUrl, { waitUntil: 'networkidle2' })

  // Parse out anchors
  const hrefs = await getAnchorRefs(page)

  // Iterate and add to database where applicable
  try {
    await Promise.all(
      hrefs.map(async (h) => (await saveAnchorRef(h, startingHost)))
    )
  } catch (error) {
    warn(`page failed with error ${error}`)
  }
  await browser.close()
  process.exit(0)
})()
