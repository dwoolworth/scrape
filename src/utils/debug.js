import config from '../config/index.cjs'
const { disableDebug } = config

export const debug = (msg) => {
  if (!disableDebug) {
    console.log('debug:', msg)
  }
}
