const path = require('path')

require('dotenv').config({
  path: path.join(__dirname, '../../.env')
})

module.exports = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  dburl: process.env.DB_URL || 'db1,db2,db3',
  dbname: process.env.DB_NAME || 'scrape',
  dbuser: process.env.DB_USER || 'loisAdmin',
  dbpass: process.env.DB_PASS || '',
  dbauth: process.env.DB_AUTH || 'authSource=admin',
  disableWarn: process.env.DISABLE_WARN || false,
  disableInfo: process.env.DISABLE_INFO || false,
  disableDie: process.env.DISABLE_DIE || false,
  domainAccessLimit: process.env.DOMAIN_ACCESS_LIMIT || 100,
  domainLimitTimeout: process.env.DOMAIN_ACCESS_LIMIT || 600,
  memcachedHost: process.env.MEMCACHED_HOST || 'memcache',
  memcachedPort: process.env.MEMCACHED_PORT || '11211',
  memcachedRetries: process.env.MEMCACHED_RETRIES || 10,
  memcachedRetry: process.env.MEMCACHED_RETRY || 10000,
  memcachedRemove: process.env.MEMCACHED_REMOVE || true,
  awsAccessKeyId: process.env.AWS_KEY || '',
  awsSecretAccessKey: process.env.AWS_SECRET || '',
  awsRegion: process.env.AWS_REGION || '',
  awsBucket: process.env.AWS_BUCKET || ''
}
