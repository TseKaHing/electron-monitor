const express = require('express')
const router = express.Router();
const { Err, Perf, Site, Alarm } = require('../db/connet');
const { sendError, getClientIP } = require('../utils/common')
const jwt = require('jsonwebtoken')
const secretOrPrivateKey = "5678FEWFWEEWGW54W4GW4E65G4E"  // 私钥
const path = require('path')
const fs = require('fs')

router.post('/addsite', (req, res, next) => {
  let { _key, name } = req.body
  let NewSite = new Site({
    _key,
    name,
  })
  let payload = {
    _key,
    name
  }
  let token = jwt.sign(payload, secretOrPrivateKey, {
    mutatePayload: true,
    issuer: "ThinkBig",
    expiresIn: 60 * 60 * 24 * 7 // 7d
  })

  NewSite.save((err, Site) => {
    if (err) {
      res.json({
        code: 500,
        message: '服务器错误，保存失败！'
      })
      return
    }
    res.json({
      code: 200,
      site: Site,
      token
    })
    return
  })
})

router.post('/getsite', (req, res, next) => {
  let { _key, _token } = req.body
  Perf.findOne({ _key }, (err, target) => {
    if (err) {
      throw new Error(err)
    }
    jwt.verify(_token, secretOrPrivateKey, (err, decoded) => {
      if (err) {
        throw new Error(err)
      }
      if (target && decoded) {
        res.json({
          code: 200,
          Performance: target
        })
      } else {
        res.json({
          code: 401,
          message: "非法token"
        })
      }
    })

  })
})

router.post('/analysis', (req, res, next) => {
  let { _report_data } = req.body
  let { _errors, _bury, _performance } = _report_data
  Err.findOne({ _key: _bury._key }, (err, target) => {
    if (err) {
      throw new Error(err)
    }
    if (target) {
      Err.updateOne({ _key: _bury._key }, {
        $set:
        {
          userAgent: _report_data._user_conf._user_agent,
          resolution: _report_data._user_conf._screen_width + '*' + _report_data._user_conf._screen_height,
          ip: getClientIP(req)
        }
      }, (err, Err) => {
        if (err) {
          throw new Error(err)
        }
      })
    } else {
      let Error = new Err({
        _key: _report_data._bury._key,
        userAgent: _report_data._user_conf._user_agent,
        resolution: _report_data._user_conf._screen_width + '*' + _report_data._user_conf._screen_height,
        ip: getClientIP(req)
      })
      Error.save((err, Err) => {
        if (err) {
          res.json({
            code: 500,
            message: '服务器错误，保存失败！'
          })
          return
        }
      })
    }
  })
  Alarm.findOne({ _key: _bury._key }, (err, target) => {
    if (err) {
      throw new Error(err)
    }
    if (target) {
      if (_errors.length != 0 && _bury.notification == true) {
        var size = 0
        fs.stat(path.resolve(__dirname, '../utils/web-monitor-sdk.js'), (err, stats) => {
          if (err) {
            throw new Error(err)
          }
          let counter = 0
          size = stats.size
          // console.log(target, _performance);
          let { alarmJsLimit, alarmBlankTimes, alarmOnLoadTimes, alarmUnLoadTimes, alarmRequestTimes, alarmAnalysisTimes } = target
          let { _ws_t, _load_t, _unload_t, _req_t, _analysis_t } = _performance
          if (size > alarmJsLimit) {
            counter++
          }
          if (_ws_t > alarmBlankTimes) {
            counter++
          }
          if (_load_t > alarmOnLoadTimes) {
            counter++
          }
          if (_unload_t > alarmUnLoadTimes) {
            counter++
          }
          if (_req_t > alarmRequestTimes) {
            counter++
          }
          if (_analysis_t > alarmAnalysisTimes) {
            counter++
          }
          if (counter >= 3) {
            sendError(_report_data._errors, alarmJsEmail = 'jazzyxie@dingtalk.com')
          }
        });
      }
    } else {
      let Warning = new Alarm({
        _key: _report_data._bury._key,
        alarmJsEmail: 'jazzyxie@dingtalk.com',
        alarmJsLimit: 5120,
        alarmJsTimes: 100,
        alarmBlankTimes: 200,
        alarmOnLoadTimes: 200,
        alarmUnLoadTimes: 100,
        alarmRequestTimes: 50,
        alarmAnalysisTimes: 50
      })
      Warning.save((err, Warning) => {
        if (err) {
          res.json({
            code: 500,
            message: '服务器错误，保存失败！'
          })
          return
        }
      })
    }
  })
  Perf.findOne({ _key: _bury._key }, (err, target) => {
    if (err) {
      throw new Error(err)
    }
    if (target) {
      Perf.updateOne({ _key: _bury._key }, {
        $set:
        {
          _pv: _report_data._pv,
          _uv: getClientIP(req),
          _performance: _report_data._performance,
          _resources: _bury.reportResource ? _report_data._resources : [],
          _errors: _report_data._errors,
          _user_conf: _report_data._user_conf,
          _bury: _report_data._bury
        }
      }, (err, Performance) => {
        if (err) {
          throw new Error(err)
        }
        res.json({
          code: 200,
          Performance
        })
      })
    } else {
      let Performance = new Perf({
        _key: _report_data._bury._key,
        notification: _report_data._bury.notification,
        reportResource: _report_data._bury.reportResource,
        _pv: _report_data._pv,
        _uv: getClientIP(req),
        _report_url: _report_data._report_url,
        _performance: _report_data._performance,
        _resources: _report_data._resources,
        _errors: _report_data._errors,
        _user_conf: _report_data._user_conf,
      })
      Performance.save((err, Performance) => {
        if (err) {
          res.json({
            code: 500,
            message: '服务器错误，保存失败！'
          })
          return
        }
        res.json({
          code: 200,
          Performance
        })
        return
      })
    }
  })
});

module.exports = router 