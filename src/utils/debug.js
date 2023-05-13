import config from '../config/index.cjs'
const { disableDebug } = config

export const debg = (msg) => {
  if (!disableDebug) {
    console.log('debg:', msg)
  }
}
