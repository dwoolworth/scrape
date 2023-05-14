import { debg } from '../utils/debug.js'
import { solrAddDoc } from './solradddoc.js'

export const parsePage = async ({ page, refRecord }) => {
  const { _id: id, fullurl: url, hostname: fqdn } = refRecord
  const title = await page.title()
  const keywords = (await page.$$eval('meta[name="keywords"]', elements => elements.map(element => element.content))).join(' ')
  const description = (await page.$$eval('meta[name="description"]', elements => elements.map(element => element.content))).join(' ')
  const content = await page.$eval('body', element => element.textContent)
  const result = await solrAddDoc({ id, url, fqdn, title, keywords, description, content })
  return result
}
