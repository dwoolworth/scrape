import {
  getNextAnchorRef,
  validateUrlContentType
} from './index.js'
import { info } from '../utils/index.js'

export const getValidatedAnchorRef = async () => {
  const refRecord = await getNextAnchorRef()
  info(`** NEXT URL: ${JSON.stringify(refRecord.fullurl)}`)
  await validateUrlContentType({ refRecord })
  info(`** URL ${refRecord.fullurl} is valid`)
  return refRecord
}
