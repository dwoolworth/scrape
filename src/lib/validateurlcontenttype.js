import axios from 'axios'
import { warn } from '../utils/index.js'
import { setRefRecordStatus } from './setrefrecordstatus.js'
import { incrDomainAccessCount } from './domainexclusions.js'

// Validates a URL's content type
export const validateUrlContentType = async ({
  refRecord
}) => {
  const time = (new Date()).getTime()
  try {
    const { headers = [] } = await axios.head(refRecord.fullurl)
    refRecord.headRequestTime = (new Date()).getTime() - time
    refRecord.contentType = headers['content-type']
    if (headers['content-type'] && !headers['content-type'].includes('text/html')) {
      throw new Error(`invalid url: ${refRecord.fullurl}, content-type: ${headers['content-type']}`)
    }
    await incrDomainAccessCount(refRecord.hostname)
    await setRefRecordStatus({ refRecord, status: 'requested' })
  } catch (error) {
    const { response } = error
    if (response) {
      await setRefRecordStatus({ refRecord, status: 'badrequest' })
      warn(`>> error ${refRecord.fullurl} response: ${response.status || 500}, message: ${error.message}`)
      throw error
    }
    await setRefRecordStatus({ refRecord, status: 'badtype' })
    warn(`>> error ${refRecord.fullurl} message: ${error.message}`)
    throw error
  }
}
