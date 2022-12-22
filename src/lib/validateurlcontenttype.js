import axios from 'axios'

export const validateUrlContentType = async (urlrec) => {
  const time = (new Date()).getTime()
  const options = {}
  if (urlrec.username || urlrec.password) {
    options.auth = {
      username: urlrec.username,
      password: urlrec.password
    }
  }
  const {
    status = 500,
    headers = []
  } = await axios.head(urlrec.fullurl, options)
  urlrec.headRequestTime = (new Date()).getTime() - time
  if (status !== 200) {
    urlrec.status = 'badrequest'
    return false
  }
  urlrec.contentType = headers['content-type']
  if (headers['content-type'] &&
     !headers['content-type'].includes('text/html')) {
    return false
  }
  return true
}
