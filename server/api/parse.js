const express = require('express')
const router = express.Router();
const models = require('../db/connet');
var nodemailer = require('nodemailer');


function sendError(err) {
  let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: '1243756230@qq.com',
      // 这里密码不是qq密码，是你设置的smtp授权码
      pass: 'pluiuxamrfcnfece',
    }
  });
  let mailOptions = {
    from: '1243756230@qq.com', // sender address
    to: 'jazzyxie@dingtalk.com', // list of receivers
    subject: '站点错误报警!!!', // Subject line
    // 发送text或者html格式
    // text: 'Hello world?', // plain text body
    // html: '<b>Hello world?</b>' // html body
    html: `
      <div>
        <p>您收到这封邮件是因为您使用了我们的前端性能监控平台，现监听到您站点发生严重错误，报错信息如下：</p>
        <p>错误类型：${err[err.length - 1]._type}</p>
        <p>错误发生行：${err[err.length - 1]._row ? err[err.length - 1]._row : 0}</p>
        <p>错误发生列：${err[err.length - 1]._col ? err[err.length - 1]._col : 0}</p>
        <p>错误信息：${err[err.length - 1]._msg.message || err[err.length - 1]._msg}</p>
        <p>错误发生URL：${err[err.length - 1]._source_url ? err[err.length - 1]._source_url : 'not known'}</p>
        <p>错误发生时间：${timestampToTime(err[err.length - 1]._create_time)}</p>
      </div>
    `
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
  });

}

function timestampToTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

router.post('/addsite', (req, res, next) => {

  let Site = new models.Site({
    _key: req.body._key,
    name: req.body.name
  })
  Site.save((err, Site) => {
    console.log(err);

    if (err) {
      res.json({
        code: 500,
        message: '服务器错误，保存失败！'
      })
      return
    }
    console.log(Site);

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
// 获取公网IP
function getClientIP(req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  return ip;
};
module.exports = router 