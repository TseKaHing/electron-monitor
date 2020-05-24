const mongoose = require('mongoose');
var Schema = mongoose.Schema

const AlarmSchema = new Schema({
  _key: { type: String },
  alarmJsEmail: { type: String, default: 'jazzyxie@dingtalk.com' },
  alarmJsLimit: { type: Number, default: 0 },
  alarmBlankTimes: { type: Number, default: 0 },
  alarmOnLoadTimes: { type: Number, default: 0 },
  alarmUnLoadTimes: { type: Number, default: 0 },
  alarmRequestTimes: { type: Number, default: 0 },
  alarmAnalysisTimes: { type: Number, default: 0 }
});

Alarm = mongoose.model('Alarm', AlarmSchema)

module.exports = Alarm