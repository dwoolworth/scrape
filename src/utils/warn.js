import config from '../config/index.cjs'
const { disableWarn } = config

export const warn = (msg) => {
  // if (!disableWarn) {
    console.error('warn:', msg)
  // }
}
