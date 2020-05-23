var nodemailer = require('nodemailer');

function sendError(err) {
  let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: '1243756230@qq.com',
      pass: 'pluiuxamrfcnfece',   //  smtp授权码
    }
  });
  let mailOptions = {
    from: '1243756230@qq.com', // 发送者邮箱
    to: 'jazzyxie@dingtalk.com', // 接收者邮箱列表
    subject: '站点错误报警!!!',
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

//  将时间戳转换成具体时间
function timestampToTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

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

module.exports = {
  sendError,
  timestampToTime,
  getClientIP
}