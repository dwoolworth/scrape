import { Url } from '../models/index.js'
import { urls } from '../seeder/urls.js'
import {
  removeExpiredExclusions,
  getDomainExclusions
} from './domainexclusions.js'
import {
  info,
  debg
} from '../utils/index.js'

// Removes any hostname/domain exclusions that have expired,
// then queries for 'new' URLs, finding one in the list and
// updating it to status 'head', then returning it.
export const getNextAnchorRef = async () => {
  debg('++ calling removeExpiredExclusions')
  await removeExpiredExclusions()
  debg('++ calling getDomainExclusions')
  const domainExclusions = await getDomainExclusions() || []
  info(`** getNextAnchorRef: domainExclusions: ${JSON.stringify(domainExclusions)}`)
  const nextUrl = await Url.findOneAndUpdate(
    {
      status: 'new',
      hostname: { $nin: domainExclusions }
    },
    {
      status: 'head'
    },
    {
      returnOriginal: false,
      sory: { _id: 1 }
    }
  )
  if (!nextUrl) {
    debg(`++ getNextAnchorRef: no nextUrl, using seeder: ${urls}`)
    const index = Math.floor(Math.random() * (urls.length - 1))
    debg(`++ getNextAnchorRef: index: ${index}`)
    info(`** getNextAnchorRef: seeder url: ${JSON.stringify(urls[index].fullurl)}`)
    return urls[index]
  }
  debg(`++ getNextAnchorRef: nextUrl: ${nextUrl}`)
  return nextUrl
}
