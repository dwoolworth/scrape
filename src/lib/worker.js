import {
  getAnchorRefs,
  getPage,
  getValidatedAnchorRef,
  saveAnchorRefs,
  setRefRecordStatus
} from './index.js'

// Continue to retrieve the next ref record and retrieve and parse for more
export const worker = async ({ browser }) => {
  while (true) {
    let refRecord
    try {
      refRecord = await getValidatedAnchorRef()
    } catch (error) {
      warn(`>> failed next ref record: ${error.message}`)
      continue
    }
    const page = await getPage({ browser, refRecord })
    refRecord.anchors = await getAnchorRefs({ page })
    //
    // Insert other functions to parse the page
    //
    await setRefRecordStatus({ refRecord, status: 'parsed' })
    await saveAnchorRefs({ refRecord })
  }
}
