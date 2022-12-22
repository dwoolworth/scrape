import { getValidatedUrl, getNameValuePairs } from "./index.js"
import { Url } from '../models/index.js'
import { warn } from '../utils/index.js'

export const saveAnchorRef = async (anchor, defaultHost) => {
  const ref = getValidatedUrl(anchor, defaultHost)
  if (!ref) {
    warn(`>> invalid url ${ref.href}`)
    return ref
  }
  const foundUrl = await Url.findOne({ fullurl: ref.href })
  if (foundUrl) {
    warn(`>> found matching url in database: ${ref.href}`)
    return ref
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
    params: getNameValuePairs(ref.searchParams),
    hash: ref.hash,
  })
  const newAnchor = await href.save()
  if (newAnchor !== href) {
    throw new Error(`could not update database with url ${ref.href}`)
  }
  return ref
}
