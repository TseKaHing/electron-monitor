import * as React from 'react'
import { Layout } from 'antd'
const { Content } = Layout
export default class ExpContent extends React.Component<any, any>{
  render = () => {
    return (
      <Content style={{ background: "#E6E6FA" }}>
        <div style={{ margin: '1.5rem 1rem 0', background: '#fff', height: 'calc(100% - 4rem)' }} >
          Content
        </div>
      </Content >
    )
  }
}