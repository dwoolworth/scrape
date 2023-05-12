import { Url } from '../models/index.js'
import { urls } from '../seeder/urls.js'
import {
  removeExpiredExclusions,
  getDomainExclusions
} from './domainexclusions.js'

// Removes any hostname/domain exclusions that have expired,
// then queries for 'new' URLs, finding one in the list and
// updating it to status 'head', then returning it.
export const getNextAnchorRef = async () => {
  await removeExpiredExclusions()
  const domainExclusions = await getDomainExclusions() || []
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
    const index = Math.random() * (urls.length - 1)
    return urls[index]
  }
  return nextUrl
}
