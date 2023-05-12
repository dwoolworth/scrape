import {
  cacheGet,
  cacheGetMany,
  cacheIncr,
  cacheSet
} from './memcache.js'
import config from '../config/index.cjs'
const {
  domainAccessLimit,
  domainLimitTimeout
} = config

export const getDomainExclusions = async () => {
  const domainExclusions = await cacheGet('domainExclusions')
  return JSON.parse(domainExclusions)
}

export const setDomainExclusions = async (domainExclusions) => {
  await cacheSet('domainExclusions', JSON.stringify(domainExclusions))
}

export const addDomainExclusion = async (domain) => {
  const domainExclusions = await getDomainExclusions() || []
  domainExclusions.push(domain)
  await setDomainExclusions(domainExclusions)
}

export const incrDomainAccessCount = async (domain) => {
  const domainRec = await cacheGet(domain)
  if (!domainRec) {
    await cacheSet(domain, 1, domainLimitTimeout)
  } else if (domainRec >= domainAccessLimit) {
    await addDomainExclusion(domain)
  } else {
    await cacheIncr(domain, 1)
  }
}

// Gets the current list of domain exclusions and retrieves all the domains
// in an array, which is passed to cacheGetMany() which returns a list of
// keys as members of the newExclusions object.
export const removeExpiredExclusions = async () => {
  const domainExclusions = await getDomainExclusions() || []
  const newExclusions = await cacheGetMany(domainExclusions) || {}
  await setDomainExclusions(Object.keys(newExclusions))
}
