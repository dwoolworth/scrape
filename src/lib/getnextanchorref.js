
import { Url } from '../models/index.js'

export const getNextAnchorRef = async () => {
  const nextUrl = await Url.findAndModify({
    query: { status: 'new' },
    sort: { _id: 1 },
    update: { $set: { status: 'head' } },
    new: true
  })
  return nextUrl
}
