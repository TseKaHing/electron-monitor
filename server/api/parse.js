const express = require('express')
const router = express.Router();
const models = require('../db/connet');
const { sendError, getClientIP } = require('../utils/common')

router.post('/addsite', (req, res, next) => {
  let Site = new models.Site({
    _key: req.body._key,
    name: req.body.name
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
      site: Site
    })
    return
  })
})

router.get('/getsite', (req, res, next) => {
  models.Performance.findOne({ _key: "123" }, (err, target) => {
    if (target) {
      res.json({
        code: 200,
        Performance: target
      })
    }
  })
})

router.post('/analysis', (req, res, next) => {
  let { _report_data } = req.body
  let { _errors, _bury } = _report_data
  if (_errors.length != 0 && _bury.notification == true) {
    sendError(_report_data._errors)
  }
  models.Performance.findOne({ _key: "123" }, (err, target) => {
    if (target) {
      models.Performance.updateOne({ _key: "123" }, {
        $set:
        {
          _pv: _report_data._pv,
          _uv: getClientIP(req),
          _performance: _report_data._performance,
          _resources: _report_data._resources,
          _errors: _report_data._errors,
          _user_conf: _report_data._user_conf,
          _bury: _report_data._bury
        }
      }, (err, Performance) => {
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
        console.log(Performance);

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