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
import { parsePage } from './parsepage.js'

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
    const anchors = await getAnchorRefs({ page })
    const result = await parsePage({ refRecord, page })
    debg(`** parsed page result: ${JSON.stringify(result)}`)
    await saveAnchorRefs({ anchors, hostname: refRecord.hostname })
    if (refRecord.seeder) {
      continue
    }
    await setRefRecordStatus({ refRecord, status: 'parsed' })
  }
}
