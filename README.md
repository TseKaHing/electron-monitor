# Electron-monitor

## 性能数据的获取主要依赖于 window.performance

前端性能最主要有以下这些基础指标：

- DNS 解析时间
- TCP 建立时间
- 白屏时间
- DOM 渲染完成时间
- 页面 onload 时间
- 页面 onready 时间
- 页面重定向时间
- 页面 unload 时间
- request 请求时间
- 解析 DOM 时间

## 技术栈

JavaScript + NodeJS + TypeScript + Electron + React + Express + MongoDB

## 总技术架构图

![总技术架构图](https://github.com/jazzyXie/electron-monitor/tree/master/public/img/埋点流程图.png)

## 总业务流程图

你可以借鉴该流程图使用此项目

![总业务流程图](https://github.com/jazzyXie/electron-monitor/tree/master/public/img/总业务流程图.png)

## 如何实现无埋点？

![埋点流程图](https://github.com/jazzyXie/electron-monitor/tree/master/public/img/埋点流程图.png)
埋点的流程主要分为三个步骤，数据埋点阶段，数据收集阶段，数据处理阶段。
（一）数据埋点阶段，在正常的 HTML 页面下 body 的第一行插入以下一段 js 脚本，即埋点，a[d] 即我们要埋的全局对象，用于收集用户行为，然后通过创建 script 标签，设置其异步执行，并将 src 属性指向收集用户行为数据的 sdk，最终过程是执行该 SDK。

``` 
 <script type="text/javascript">
    !(function (a, b, c, d) {
      a[d] = a[d] || {}
      a[d].options = {
        _key: '123',
        disableHook: false,
        disableJS: false,
        disableResource: false
      }
      var _bury_script = document.createElement("script")
      _bury_script.setAttribute("crossorigin", "anonymous")
      _bury_script.setAttribute("src", c)
      document.body.insertBefore(\_bury_script, document.body.firstChild)
    })(window, document, 'http://localhost:3000/web-monitor-sdk.js', '\_bury')
  </script>
```

（二）数据收集阶段，获取用户的各种信息，如 performance 信息，上一条地址，语言，分辨率，域名，端口，协议、标题、用户代理，以及错误信息等，最终通过 http 请求上报到服务端。

```
//   上报的数据
  const _report_data = {
    _report_url: "",
    _performance: {},
    _resources: {},
    _errors: [],
    _user_conf: {
      _protocal: document.location.protocol.split(':')[0] || "http",
      _domain: document.domain || "",
      _port: document.location.host.split(':')[1],
      _title: document.title || "",
      _referrer: document.referrer || "",
      _user_agent: navigator.userAgent || "",
      _screen_width: window.screen.width,
      _screen_height: window.screen.height,
      _color_depth: window.screen.colorDepth,
      _language: navigator.language
    },
    _bury: window["_bury"].options
  }
```

那如何进行错误数据的收集？通过资源的收集，能捕获到的错误有三种，资源加载错误，js 执行错误，promise 错误。通过  addEventListener('error', callback, true)  在捕获阶段捕捉资源加载失败错误，通过  window.onerror  捕捉 js 错误，通过  addEventListener('unhandledrejection', callback)捕捉 promise 错误，但是没有发生错误的行数，列数等信息，只能手动抛出相关错误信息。关键代码如下：

```
 //  捕获资源加载失败错误  js css img...
  window.addEventListener('error', function (event) {
    var target = event.target
    if (target != window) {
      _report_data.\_errors.push({
        _type: target.localName,
        _url: target.src || target.href,
        _msg: (target.src || target.href) + ' is load error',
        _create_time: new Date().getTime()
      })
      _upload()
    }
  })
```

```
  //  监听  js  错误
  window.onerror = function (event, source_url, row, column, err) {
    _report_data.\_errors.push({
      _type: 'javascript', //  错误类型
      _row: row, //  发生错误时的代码行数
      _col: column, //  发生错误时的代码列数
      _msg: err && err.stack ? err.stack : event, //  错误信息
      _source_url: source_url, //  错误文件
      _create_time: new Date().getTime()
    })
    _upload()
  }
  //  监听  promise  错误   缺点是获取不到行数数据
  window.addEventListener('unhandledrejection', function (event) {
    _report_data.\_errors.push({
      _type: 'promise',
      _msg: (event.reason && event.reason.msg) || event.reason || '',
      _create_time: new Date().getTime()
    })
    _upload()
  })
```

收集完数据，我们可以在页面空闲时才进行数据上报，尽量不要对页面性能造成影响。

``` 
window.onload = function () {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        _report_data.\_performance = _get_performance()
        _report_data.\_resources = _get_resources()
      })
    } else {
      setTimeout(() => {
        _report_data.\_performance = _get_performance()
        _report_data.\_resources = _get_resources()
      }, 0)
    }
    _upload()
}
```

（三）数据处理阶段，数据获取到数据后，将其写到日志，以防数据丢失，将数据存储到 MongoDB 数据库。

## 数据可视化

借助于阿里的 AntV

## 运行项目

1. `yarn run dev` 动态打包 dist 目录
2. `yarn run start` 运行 electron 项目

## 打包成桌面应用

Todo
