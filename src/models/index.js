import mongoose from 'mongoose'
import Url from './url.js'
import config from '../config/index.cjs'
import { debg } from '../utils/index.js'
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
  debg(`++ Connecting to ${dbConnectionString} with options: ${JSON.stringify(options)}`)
  return mongoose.connect(dbConnectionString, options)
}

const closeDb = async () => {
  debg('++ Closing db connection')
  await mongoose.connection.close()
}

export {
  connectDb,
  closeDb,
  Url
}
