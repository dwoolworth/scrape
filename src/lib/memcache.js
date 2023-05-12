import Memcached from 'memcached'
import {
  memcachedHost,
  memcachedPort,
  memcachedRetries,
  memcachedRetry,
  memcachedRemove
} from '../config/index.cjs'

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
  mc.set(key, obj, lifetime, () => resolve())
})

export const cacheIncr = async (key, amount) => new Promise((resolve) => {
  mc.incr(key, amount, () => resolve())
})

export const cacheGet = async key => new Promise((resolve, reject) => {
  mc.get(key, (err, data) => err ? reject(err) : resolve(data))
})

export const cacheGetMany = async keys => new Promise((resolve, reject) => {
  mc.getMulti(keys, (err, data) => err ? reject(err) : resolve(data))
})
