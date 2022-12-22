import puppeteer from 'puppeteer'
import { connectDb } from './models/index.js'
import {
  closeGracefully,
  getAnchorRefs,
  getNextAnchorRef,
  saveAnchorRef,
  validateUrlContentType
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

  // Start process
  const browser = await puppeteer.launch()

  while (true) {
    const refRecord = await getNextAnchorRef()
    const validType = await validateUrlContentType(refRecord)
    await refRecord.save()
    if (!validType) {
      continue
    }
    const page = await browser.newPage();


  }

  

  // Set starting URL
  const startingUrl = 'https://lassoedapp.com/'


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
