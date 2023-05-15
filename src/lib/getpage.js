import { die } from '../utils/index.js'
import { setRefRecordStatus } from './setrefrecordstatus.js'

export const getPage = async ({
  browser,
  refRecord
}) => {
  const { fullurl } = refRecord
  const pages = await browser.pages()
  const page = pages.length
    ? pages[0]
    : die('>> no pages are open in browser')
  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 })
  const time = (new Date()).getTime()
  await page.goto(fullurl, { waitUntil: 'networkidle2' })
  refRecord.fullRequestTime = (new Date()).getTime() - time
  await setRefRecordStatus({ refRecord, status: 'parsed' })
  return page
}
