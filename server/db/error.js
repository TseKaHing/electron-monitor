const mongoose = require('mongoose');
var Schema = mongoose.Schema

const SiteSchema = new Schema({
  _key: { type: String },
  name: { type: String },
});

Error = mongoose.model('Error', SiteSchema)

module.exports = Error