import config from '../config/index.cjs'
const { disableInfo } = config

export const info = (msg) => {
  // if (!disableInfo) {
    console.log('info:', msg)
  // }
}
