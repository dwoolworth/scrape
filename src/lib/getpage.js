import { die } from '../utils/index.js'

export const getPage = async ({
  browser,
  refRecord: {
    fullurl
  }
}) => {
  const pages = await browser.pages()
  const page = pages.length
    ? pages[0]
    : die('>> no pages are open in browser')
  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 })
  await page.goto(fullurl, { waitUntil: 'networkidle2' })
  return page
}
