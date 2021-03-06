import * as React from 'react'
import { Card } from 'antd';
import './index'
import axios from 'axios'
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers['Content-Type'] = 'application/json'
import { Collapse, Divider, notification } from 'antd';

const { Panel } = Collapse;
export default class Error extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      config: {},
      error: []
    }
  }
  componentDidMount = () => {
    let { config } = this.state
    let _key = localStorage.getItem("_key")
    let _token = localStorage.getItem("_token")
    axios.post('http://localhost:3000/parse/getsite', { _key, _token })
      .then(res => {
        if (res.data.code == 200) {
          let { _user_conf, _errors } = res.data.Performance
          axios.get('https://apis.map.qq.com/ws/geocoder/v1/', {
            params: {
              location: _user_conf._location._latitude + ',' + _user_conf._location._longitude,
              key: 'IG6BZ-IJZKP-IIRDQ-VFOWP-FM2Y5-WJBIM'
            }
          }).then(res => {
            this.setState({
              config: {
                ..._user_conf,
                _address: res.data.result.address
              },
              error: _errors
            })
          }).catch(err => {
            throw new Error(err)
          })
          if (!_user_conf.notification) {
            notification['error']({
              message: "站点错误报警!!!",
              description:
                <div>
                  <p>错误类型：{_errors[_errors.length - 1]._type}</p>
                  <p>错误发生行：{_errors[_errors.length - 1]._row ? _errors[_errors.length - 1]._row : 0}</p>
                  <p>错误发生列：{_errors[_errors.length - 1]._col ? _errors[_errors.length - 1]._col : 0}</p>
                  <p>错误信息：{_errors[_errors.length - 1]._msg.message || _errors[_errors.length - 1]._msg}</p>
                  <p>错误发生URL：{_errors[_errors.length - 1]._source_url ? _errors[_errors.length - 1]._source_url : 'not known'}</p>
                  <p>错误发生时间：{this.timestampToTime(_errors[_errors.length - 1]._create_time)}</p>
                </div>
            });
          }
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  timestampToTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  }
  render() {
    let { config, error } = this.state
    let _conf = {
      domain: config._protocol + '://' + config._domain + ':' + config._port,
      referrer: config._referrer,
      userAgent: config._user_agent,
      resolution: config._screen_width + '*' + config._screen_height,
      language: config._language,
      colorDepth: config._color_depth,
      address: config._address
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Divider orientation="left">Base Info</Divider>
        <section style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <Card title="Domain" style={{ width: 240 }}>{_conf.domain}</Card>
          <Card title="Color Depth" style={{ width: 240 }}>{_conf.colorDepth}</Card>
          <Card title="User Agent" style={{ width: 240 }}>{_conf.userAgent}</Card>
          <Card title="Resolution" style={{ width: 240 }}>{_conf.resolution}</Card>
          <Card title="Language" style={{ width: 240 }}>{_conf.language}</Card>
          <Card title="Site Info" style={{ width: 240 }}>{_conf.address}</Card>
        </section>
        <Divider orientation="left">Error Scenes</Divider>
        {error.length ?
          <Collapse accordion style={{ width: '96%' }}>
            {
              error.map((el: any, idx: number) => {
                return (
                  <Panel header={`${el._type} error: ${el._msg.message || el._msg}`} key={idx}>
                    <p>Type: {el._type}</p>
                    <p>Source URL: {el._source_url ? el._source_url : ""}</p>
                    <p>Row: {el._row ? el._row : 0}</p>
                    <p>Column: {el._col ? el._col : 0}</p>
                    <p>Create Time: {this.timestampToTime(el._create_time)}</p>
                  </Panel>
                )
              })
            }
          </Collapse>
          :
          <span style={{ fontSize: '2rem', height: 100, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No error found</span>
        }
      </div>
    )
  }
}