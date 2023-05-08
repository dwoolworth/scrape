import { Url } from '../models/index.js'

// Return the next anchor ref
export const getNextAnchorRef = async () => {
  const nextUrl = await Url.findOneAndUpdate(
    { status: 'new' },
    { status: 'head' },
    {
      returnOriginal: false,
      sory: { _id: 1 }
    }
  )
  return nextUrl
}
