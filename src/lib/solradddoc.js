import axios from 'axios'
import config from '../config/index.cjs'
import { warn } from '../utils/warn.js'
import { debg } from '../utils/debug.js'

const {
  solrAddDocApi,
  solrCollectionName
} = config

export const solrAddDoc = async ({
  id,
  url,
  fqdn,
  title,
  keywords,
  description,
  content
}) => {
  try {
    const apiUrl = `${solrAddDocApi}${solrCollectionName}/update?commit=true`
    debg(`++ solrAddDoc apiUrl: ${apiUrl}`)
    debg(`++ post body: ${id}, ${url}, ${fqdn}, ${title}, ${keywords}, ${description}`)
    const resp = await axios.post(`${apiUrl}`, [{ id, url, fqdn, title, keywords, description, content }])
    debg(`++ solrAddDoc resp: ${JSON.stringify(resp.data)}`)
    return resp.data
  } catch (error) {
    warn(`>> solrAddDoc error: ${error.message}`)
  }
}
