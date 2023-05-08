import config from '../config/index.cjs'
const { disableDie } = config

export const die = (msg) => {
  if (!disableDie) {
    console.error('fatal:', msg)
  }
  process.exit(1)
}
