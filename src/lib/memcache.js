import Memcached from 'memcached'
import config from '../config/index.cjs'
import { debg, warn } from '../utils/index.js'
const {
  memcachedHost,
  memcachedPort,
  memcachedRetries,
  memcachedRetry,
  memcachedRemove
} = config

const mc = new Memcached(
    `${memcachedHost}:${memcachedPort}`,
    {
      retries: memcachedRetries,
      retry: memcachedRetry,
      remove: memcachedRemove
    }
)

// NOTE: cacheSet/cacheGet are setup to always return something even if the
//       memcached process is not running.  If that's the case, then nothing
//       is cached.  However, to recover after memcached is launched, note the
//       processes have to be restarted.
export const cacheSet = async (key, obj, lifetime) => new Promise((resolve) => {
  debg(`++ cacheSet: ${key} => ${obj}, ${lifetime}`)
  mc.set(key, obj, lifetime, () => resolve())
})

export const cacheIncr = async (key, amount) => new Promise((resolve) => {
  debg(`++ cacheIncr: ${key} => ${amount}`)
  mc.incr(key, amount, () => resolve())
})

export const cacheGet = async key => new Promise((resolve, reject) => {
  debg(`++ cacheGet: ${key}`)
  mc.get(key, (err, data) => {
    if (err) {
      warn(`>> cacheGet: ${err}`)
      reject(err)
    }
    debg(`++ cacheGet: ${key} => ${data}`)
    resolve(data)
  })
})

export const cacheGetMany = async keys => new Promise((resolve, reject) => {
  mc.getMulti(keys, (err, data) => err ? reject(err) : resolve(data))
})
