import * as React from 'react'
import PlaceHolder from '../../assets/img/future.svg'
import { Button, Modal, Input, Card } from 'antd';
import { BankTwoTone, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
var uuid = require('node-uuid');
const { Meta } = Card
import axios from 'axios'
import Error from '../error';
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers['Content-Type'] = 'application/json'
interface IState {
  _site: {
    _key?: string | null,
    name?: string | null
  },
  visible: boolean,
  isEmpty: boolean,
  _input: string,
  domain: string,
  title: string,
  userAgent: string,
  resolution: string,
  language: string,
  colorDepth: string
}
export default class Web extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      _site: {},
      visible: false,
      isEmpty: false,
      _input: "",
      domain: '',
      title: '',
      userAgent: '',
      resolution: '',
      language: '',
      colorDepth: ''
    }
  }
  componentDidMount = () => {
    let { _site, isEmpty } = this.state
    if (localStorage.getItem("_key") || localStorage.getItem("name")) {
      this.setState({
        isEmpty: true
      })
    }
    if (localStorage.getItem("_key")) {
      _site._key = localStorage.getItem("_key")
    }
    if (localStorage.getItem("name")) {
      _site.name = localStorage.getItem("name")
    }
    let _key = localStorage.getItem("_key")
    let _token = localStorage.getItem("_token")
    axios.post('http://localhost:3000/parse/getsite', { _key, _token })
      .then(res => {
        if (res.data.code == 200) {
          let { _user_conf } = res.data.Performance
          this.setState({
            domain: _user_conf._domain,
            title: _user_conf._title,
            userAgent: _user_conf._user_agent,
            resolution: _user_conf._screen_width + '*' + _user_conf._screen_height,
            language: _user_conf._language,
            colorDepth: _user_conf._color_depth
          })
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    let { _site, _input } = this.state
    let web = {
      _key: uuid.v4().replace(/-/g, ""),
      name: _input
    }
    axios.post('http://localhost:3000/parse/addsite', web)
      .then(res => {
        let { code, site, token } = res.data
        if (code == 200) {
          let res_site = site
          _site._key = res_site._key
          _site.name = res_site.name
          localStorage.setItem("_key", res_site._key)
          localStorage.setItem("name", res_site.name)
          localStorage.setItem("_token", token)
          this.setState({
            isEmpty: true
          })
        }

      })
      .catch(err => {
        throw new Error(err)
      })
  };
  handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.value) {
      this.setState({ _input: e.target.value })
    }
  }
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  turnToConf = () => {
    this.props.history.push("/exp/conf");
  }
  render = () => {
    const { _site, visible, isEmpty, domain, title, resolution, userAgent, language, colorDepth } = this.state
    // localStorage.clear()
    return (
      <div>
        {
          isEmpty ?
            <Card
              title={`${localStorage.getItem("name")}`}
              style={{ width: 300, position: 'relative', left: 10, top: 10 }}
              actions={[
                <SettingOutlined key="setting" onClick={this.turnToConf} />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              {/* <div> */}
              <p>Domain：{domain}</p>
              <p>Title：{title}</p>
              <p>Resolution：{resolution}</p>
              <p>User Agent：{userAgent}</p>
              <p>Language：{language}</p>
              <p>Color Depth：{colorDepth}</p>
              {/* </div> */}
              {/* <Meta
                title={`Site Name：${localStorage.getItem("name")}`}
                description={`
                <div>
                  <p>Domain：${domain}</p>
                  <p>Title：${title}</p>
                  <p>Resolution：${resolution}</p>
                  <p>User Agent：${userAgent}</p>
                  <p>Language：${language}</p>
                  <p>Color Depth：${colorDepth}</p>
                </div>
                `}
              /> */}
            </Card>
            :
            <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={PlaceHolder} style={{ width: '400px', height: '400px', display: 'block' }} />
              <label style={{ color: '#515a6e', fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1.5rem', marginTop: '1.5rem' }}>No webs!!!</label>
              <label style={{ color: '#515a6e', fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1.5rem', marginTop: '1.5rem' }}>Try to create one?</label>
              <Button
                type="dashed"
                onClick={this.showModal}
                style={{ color: '#515a6e', fontWeight: 'bold', lineHeight: '1.5rem', marginTop: '1.5rem' }}
              > Click me!</Button>
              <Modal
                title="Add website"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width="20rem"
              >
                <Input onChange={event => this.handleDataChange(event)} prefix={<BankTwoTone />} placeholder="web name..." maxLength={12} />
              </Modal>
            </div>

        }
      </div>
    )
  }
}