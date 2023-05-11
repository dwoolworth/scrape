import mongoose from 'mongoose'
import Url from './url.js'
import config from '../config/index.cjs'
const {
  dbuser,
  dbpass,
  dbname,
  dburl,
  dbauth,
  dbrepl
} = config

const repl = dbrepl ? `&${dbrepl}` : ''
const qs = `${dbauth}${repl}`
const dbConnectionString = `mongodb://${dbuser}:${dbpass}@${dburl}/${dbname}?${qs}`

const connectDb = () => {
  const options = {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongoose.set('strictQuery', true)
  console.error(`Connecting to ${dbConnectionString} with options: ${JSON.stringify(options)}`)
  return mongoose.connect(dbConnectionString, options)
}

const closeDb = async () => {
  await mongoose.connection.close()
}

export {
  connectDb,
  closeDb,
  Url
}
