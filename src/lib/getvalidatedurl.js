// Returns valid URL or throws error
export const getValidatedUrl = ({
  newurl,
  defaultHost,
  includeDefaultHost = false
}) => {
  try {
    if (!includeDefaultHost) {
      return new URL(newurl)
    }
    return new URL(newurl, defaultHost)
  } catch (error) {
    if (includeDefaultHost) {
      throw new Error(`getValidatedUrl error: ${error}`)
    }
  }
  getValidatedUrl(newurl, defaultHost, true)
}
