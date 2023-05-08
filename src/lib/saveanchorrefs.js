import { getValidatedUrl } from './getvalidatedurl.js'
import { getNameValuePairs } from './getnamevaluepairs.js'
import { Url } from '../models/index.js'
import {
  info,
  warn
} from '../utils/index.js'

// Get an array of new anchor reference records
const createNewRecs = async ({ anchors, hostname }) => {
  const recs = []
  for (const h of anchors) {
    try {
      const ref = getValidatedUrl({ newurl: h, defaultHost: hostname })
      const foundUrl = await Url.findOne({ fullurl: ref.href })
      if (foundUrl) {
        warn(`>> found matching url in database: ${ref.href}`)
        continue
      }
      const href = new Url({
        fullurl: ref.href,
        protocol: ref.protocol,
        username: ref.username,
        password: ref.password,
        hostname: ref.hostname,
        port: ref.port,
        pathname: ref.pathname,
        querystring: ref.search,
        params: getNameValuePairs(ref),
        hash: ref.hash,
        updated: new Date(),
        created: new Date()
      })
      recs.push(href)
    } catch (error) {
      warn(`>> invalid url ${h}, error: ${error.message}`)
    }
  }
  return recs
}

// save an anchor reference to the database
export const saveAnchorRefs = async ({ refRecord }) => {
  const records = await createNewRecs(refRecord)
  if (!records.length) {
    return
  }
  const result = await Url.insertMany(records, { ordered: false, rawResult: true })
  if (result.mongoose && result.mongoose.validationErrors && result.mongoose.validationErrors.length > 0) {
    warn(`** insertMany error: ${result.mongoose.validationErrors}`)
  }
  info(`** insertMany result: ${result.insertedCount}`)
}
