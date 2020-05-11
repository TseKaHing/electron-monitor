const mongoose = require('mongoose');
var Schema = mongoose.Schema

const PerformanceSchema = new Schema({
  _key: {
    type: String, unique: true
  },
  notification: { type: Boolean },
  reportResource: { type: Boolean },
  _report_url: { type: String },
  _performance: { type: Object },
  _resources: { type: Object },
  _errors: { type: Array },
  _user_conf: { type: Object },
  _pv: { type: Number },
  _uv: { type: String || Number }
});

Performance = mongoose.model('Performance', PerformanceSchema)

module.exports = Performance