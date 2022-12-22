import mongoose from 'mongoose'

const { Schema } = mongoose

const urlSchema = new Schema({
  fullurl: {
    type: String,
    required: true,
    index: true
  },
  protocol: String,
  username: String,
  password: String,
  hostname: {
    type: String,
    required: true,
    index: true
  },
  port: Number,
  pathname: {
    type: String,
    required: true,
    index: true
  },
  querystring: String,
  params: [Object],
  hash: String,
  status: {
    type: String, // new, head, badrequest, badtype, requested, parsed
    required: true,
    default: 'new',
    index: true
  },
  headRequestTime: Number,
  contentType: String,
  fullRequestTime: Number,
  anchors: [String],
  content: String,
  created: Date,
  updated: Date
})

urlSchema.pre('save', function (next) {
  this.updated = new Date()
  if (!this.created) {
    this.created = new Date()
  }
  next()
})

const Url = mongoose.model('Url', urlSchema)
export default Url
