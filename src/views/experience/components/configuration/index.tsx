import * as React from 'react'
import { Divider, Checkbox } from 'antd';

export default class Configuration extends React.Component<any, any> {


  constructor(props: any) {
    super(props)
    this.state = {
      reportResource: false,
      notification: false
    }
  }
  setReportResourceState = (e: any) => {
    this.setState({
      reportResource: e.target.checked
    })
  }
  setNotification = (e: any) => {
    this.setState({
      notification: e.target.checked
    })
  }
  render() {
    let { notification, reportResource } = this.state
    var bury_script = `<script type="text / javascript">
        !(function (a, b, c, d) {
          a[d] = a[d] || {}
          a[d].options = {
          _key: ${localStorage.getItem("_key")},
          notification: ${notification},
          reportResource: ${reportResource}
        }
        var _bury_script = document.createElement("script")
        _bury_script.setAttribute("crossorigin", "anonymous")
        _bury_script.setAttribute("src", c)
        document.body.insertBefore(_bury_script, document.body.firstChild)
      })(window, document, 'http://localhost:3000/web-monitor-sdk.js', '_bury')
      </script >`
    return (
      <div>
        <section style={{ margin: 20 }}>
          <Divider orientation="left">SDK扩展配置项</Divider>
          <div>注意：更改以下配置项后，BI探针内容也会相应的变化，需要将BI探针内容重新复制/粘贴到页面HTML中，并且部署后才会生效。</div>
          <Checkbox onChange={this.setReportResourceState}>是否上报页面资源</Checkbox>
          <Checkbox onChange={this.setNotification}>是否通过邮件上报</Checkbox>
        </section>
        <section style={{ margin: 20 }}>
          <Divider orientation="left">BI探针</Divider>
          <div style={{ marginBottom: 10 }}>复制下方的代码，将其粘贴在页面HTML的body中第一行。</div>
          <span style={{ background: '#f8f8f8', color: '#6c757d' }}>{bury_script}</span>
        </section>
      </div >
    )
  }
}