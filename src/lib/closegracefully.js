import { warn } from '../utils/index.js'
import { closeDb } from '../models/index.js'

// Shutdown gracefully if signal received to do so
export const closeGracefully = async (signal) => {
  warn(`>> received signal to terminate: ${signal}`)
  await closeDb()
  process.exit(0)
}
