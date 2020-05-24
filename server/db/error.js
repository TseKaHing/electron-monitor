const mongoose = require('mongoose');
var Schema = mongoose.Schema

const ErrorSchema = new Schema({
  _key: { type: String },
  userAgent: { type: String },
  resolution: { type: String },
  ip: { type: String },
});

Err = mongoose.model('Error', ErrorSchema)

module.exports = Err