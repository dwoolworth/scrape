import {
  info,
  debg,
  warn
} from '../utils/index.js'
import {
  getAnchorRefs,
  getPage,
  getValidatedAnchorRef,
  saveAnchorRefs,
  setRefRecordStatus
} from './index.js'
import natural from 'natural'
import stopwords from 'stopwords'

const tokenizer = new natural.WordTokenizer()
const stemmer = natural.PorterStemmer
const stopw = stopwords.english

const getFilteredTokens = (content) => {
  const tokens = tokenizer.tokenize(content).map(token => token.replace(/[^\w\s]/g, ''))
  const filteredTokens = tokens.filter(token => !stopw.includes(token))
  const stemmedTokens = filteredTokens.map(token => stemmer.stem(token))
  return stemmedTokens
}

// Continue to retrieve the next ref record and retrieve and parse for more
export const worker = async ({ browser }) => {
  while (true) {
    let refRecord
    try {
      info('** getting next ref record')
      refRecord = await getValidatedAnchorRef()
      debg(`++ got next ref record: ${refRecord.fullurl}`)
    } catch (error) {
      warn(`>> failed next ref record: ${error.message}`)
      continue
    }
    const page = await getPage({ browser, refRecord })
    refRecord.anchors = await getAnchorRefs({ page })
    await saveAnchorRefs({ refRecord })
    if (refRecord.seeder) {
      continue
    }
    refRecord.anchors = []
    const title = await page.title()
    refRecord.title = getFilteredTokens(title || '')
    const keywords = await page.$$eval('meta[name="keywords"]', elements => elements.map(element => element.content))
    refRecord.keywords = getFilteredTokens((keywords || []).join(' '))
    const description = await page.$$eval('meta[name="description"]', elements => elements.map(element => element.content))
    refRecord.description = getFilteredTokens((description || []).join(' '))
    const textContent = await page.$eval('body', element => element.textContent)
    refRecord.content = getFilteredTokens((textContent || ''))
    await setRefRecordStatus({ refRecord, status: 'parsed' })
  }
}
