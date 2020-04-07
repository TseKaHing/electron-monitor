import * as React from 'react'
import { Layout } from 'antd'
const { Content } = Layout
import PlaceHolder from '../assets/img/future.svg'
import { Button, Modal, Input } from 'antd';
import { BankTwoTone } from '@ant-design/icons';
var uuid = require('node-uuid');

interface ISate {
  webs: Array<any>,
  visible: boolean,
  _input: string
}
export default class ExpContent extends React.Component<any, ISate>{
  constructor(props: any) {
    super(props)
    this.state = {
      webs: [],
      visible: false,
      _input: ""
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    let { webs, _input } = this.state
    console.log(_input);

    let web = {
      id: uuid.v4().replace(/-/g, ""),
      name: _input
    }
    webs.push(web)
    this.setState({
      visible: false,

    });
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
  render = () => {
    const { webs, visible } = this.state
    return (
      <Content style={{ background: "#E6E6FA" }}>
        <div style={{ margin: '1.5rem 1rem 0', background: '#fff', height: 'calc(100% - 4rem)' }} >
          {
            webs.length === 0 ?
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
              :
              <div>Content</div>
          }
        </div>
      </Content >
    )
  }
}