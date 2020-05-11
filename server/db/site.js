const mongoose = require('mongoose');
var Schema = mongoose.Schema

const SiteSchema = new Schema({
  _key: { type: String },
  name: { type: String },
});

Site = mongoose.model('Site', SiteSchema)

module.exports = Site