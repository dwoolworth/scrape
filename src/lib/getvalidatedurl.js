import { warn } from '../utils/index.js'

// Returns valid URL or undefined
export const getValidatedUrl = (newurl, defaultHost, includeDefaultHost = false) => {
  try {
    if (!includeDefaultHost) {
      const url = new URL(newurl)
      return url
    } else {
      const url = new URL(newurl, defaultHost)
      return url
    }
  } catch (error) {
    warn(`>> getValidatedUrl error: ${error}`)
    if (includeDefaultHost) { return undefined }
    getValidatedUrl(newurl, defaultHost, true)
  }
}
