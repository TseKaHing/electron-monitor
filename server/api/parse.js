const express = require('express')
const router = express.Router();
const models = require('../db/connet');
const { sendError, getClientIP } = require('../utils/common')
const jwt = require('jsonwebtoken')
const secretOrPrivateKey = "5678FEWFWEEWGW54W4GW4E65G4E"  // 私钥

router.post('/addsite', (req, res, next) => {
  let { _key, name } = req.body
  let Site = new models.Site({
    _key,
    name
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

  Site.save((err, Site) => {
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
  models.Performance.findOne({ _key }, (err, target) => {
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
  let { _errors, _bury } = _report_data
  if (_errors.length != 0 && _bury.notification == true) {
    sendError(_report_data._errors)
  }
  models.Performance.findOne({ _key: _bury._key }, (err, target) => {
    if (target) {
      models.Performance.updateOne({ _key: _bury._key }, {
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
          Performance: Performance
        })
      })
    } else {
      let Performance = new models.Performance({
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
          Performance: Performance
        })
        return
      })
    }
  })
});

module.exports = router 