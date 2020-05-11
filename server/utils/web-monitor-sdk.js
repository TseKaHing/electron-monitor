function _WEB_MONITOR() {
  //  上报的数据
  var _report_data = {
    _report_url: "",
    _performance: _get_performance() || {},
    _resources: _get_resources() || {},
    _errors: [],
    _pv: 1,
    _user_conf: {
      _protocol: document.location.protocol.split(':')[0] || "http",
      _domain: document.domain || "",
      _port: document.location.host.split(':')[1],
      _title: document.title || "",
      _referrer: document.referrer || "",
      _user_agent: navigator.userAgent || "",
      _screen_width: window.screen.width,
      _screen_height: window.screen.height,
      _color_depth: window.screen.colorDepth,
      _language: navigator.language,
      _location: _get_location() || {}
    },
    _bury: window["_bury"].options
  }
  // 统计pv值
  function _cal_uv() {
    // var pv = 0
    var location = window.location
    var oldUrl = location.href
    var oldHash = location.hash
    setInterval(() => {
      var newUrl = location.href
      var newHash = location.hash
      if (newUrl !== oldUrl || newHash !== oldHash) {
        oldUrl = newUrl
        oldHash = newHash
        _report_data._pv++
        _upload()
      }
    }, 1000)
  }
  // 获取地理位置信息
  function _get_location() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
      throw new Error("Geolocation is not supported by this browser.")
    }
    function showPosition(position) {
      let _position = {
        _latitude: position.coords.latitude,
        _longitude: position.coords.longitude,
        _altitude: position.coords.altitude,
        _accuracy: position.coords.accuracy,
        _altitude_accuracy: position.coords.altitudeAccuracy,
        _speed: position.coords.speed
      }
      _report_data._user_conf._location = _position
    }
    function showError(error) {
      throw new Error(error)

    }
  }
  // 获取性能信息
  function _get_performance() {
    if (!window.performance) return
    var timing = performance.timing
    var _performance = {
      //  DNS 解析时间
      _dns_t: timing.domainLookupEnd - timing.domainLookupStart || 0,
      //  TCP 建立时间
      _tcp_t: timing.connectEnd - timing.connectStart || 0,
      //  白屏时间
      _ws_t: timing.responseStart - timing.navigationStart || 0,
      //  DOM 渲染完成时间
      _dom_t: timing.domContentLoadedEventEnd - timing.navigationStart || 0,
      //  页面 onload 时间
      _load_t: timing.loadEventEnd - timing.navigationStart || 0,
      //  页面 onready 时间
      _ready_t: timing.fetchStart - timing.navigationStart || 0,
      //  页面重定向时间
      _redirect_t: timing.redirectEnd - timing.redirectStart || 0,
      //  页面 unload 时间
      _unload_t: timing.unloadEventEnd - timing.unloadEventStart || 0,
      //  request 请求耗时
      _req_t: timing.responseEnd - timing.requestStart || 0,
      //  解析 DOM 耗时
      _analysis_t: timing.domComplete - timing.domInteractive || 0
    }
    return _performance
  }
  // 获取资源信息
  function _get_resources() {
    if (!window.performance) return
    const _resource_from_performance = window.performance.getEntriesByType('resource')
    const _resource = {
      xmlhttprequest: [],
      css: [],
      other: [],
      script: [],
      img: [],
      link: [],
      fetch: [],
      _create_time: Math.round(new Date() / 1000)
    }
    _resource_from_performance.forEach(item => {
      arr = _resource[item.initiatorType]
      arr && arr.push({
        _name: item.name,
        _duration: item.duration.toFixed(2),
        _size: item.transferSize,
        _protocol: item.nextHopProtocol
      })
    })
    return _resource
  }

  window.onload = function () {
    console.log(_report_data._bury);

    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        _report_data._performance = _get_performance()
        if (_report_data._bury.reportResource) {
          _report_data._resources = _get_resources()
        }

        // _report_data._user_conf._position = _get_location()
      })
    } else {
      setTimeout(() => {
        _report_data._performance = _get_performance()
        if (_report_data._bury.reportResource) {
          _report_data._resources = _get_resources()
        }
        // _report_data._user_conf._position = _get_location()
      }, 0)
    }
    _upload()
  }

  // 捕获资源加载失败错误 js css img...
  window.addEventListener('error', function (event) {
    var target = event.target
    if (target != window) {
      _report_data._errors.push({
        _type: target.localName,
        _url: target.src || target.href,
        _msg: (target.src || target.href) + ' is load error',
        _create_time: new Date().getTime()
      })
      _upload()
    }
  })
  // 监听 js 错误
  window.onerror = function (event, source_url, row, column, err) {
    _report_data._errors.push({
      _type: 'javascript', // 错误类型
      _row: row, // 发生错误时的代码行数
      _col: column, // 发生错误时的代码列数
      _msg: err && err.stack ? err.stack : event, // 错误信息
      _source_url: source_url, // 错误文件
      _create_time: Math.round(new Date() / 1000)
    })
    _upload()
  }
  // 监听 promise 错误 缺点是获取不到行数数据
  window.addEventListener('unhandledrejection', function (event) {
    _report_data._errors.push({
      _type: 'promise',
      _msg: (event.reason && event.reason.msg) || event.reason || '',
      _create_time: Math.round(new Date() / 1000)
    })
    _upload()
  })

  function _set_url(url) {
    _report_data._report_url = url
  }
  function _upload() {
    console.log(_report_data);
    _ajax({
      url: _report_data._report_url,
      type: "post",
      dataType: 'json',
      data: {
        _report_data
      }
    });
  }
  _set_url("http://localhost:3000/parse/analysis")
  _cal_uv()
  // return { _set_url, _get_performance, _get_resources }
}

// 重写 ajax
function _ajax(options) {
  options = options || {};
  options.type = (options.type || "get").toLowerCase()
  // options.dataType = options.dataType || "json";
  var params = formatParams(options.data);
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else {
    //  兼容 IE6 及其以下版本浏览器
    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  }
  if (options.type == "get") {
    xhr.open("get", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type == "post") {
    xhr.open("post", options.url, true);
    //设置表单提交时的内容类型
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(options.data));
  }
  //格式化参数
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join("&");
  }

}
(function () {
  // var { _set_url, _get_performance, _get_resources } = new _WEB_MONITOR()
  _WEB_MONITOR()
  // _set_url("http://localhost:3000/parse/analysis")
  // _get_performance()
  // _get_resources()
})()