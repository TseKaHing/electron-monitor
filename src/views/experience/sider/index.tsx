import * as React from 'react'
import { Link } from 'react-router-dom';
import './index.less'
import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined,
  BugOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
const { Sider } = Layout
const { SubMenu } = Menu
export default class ExpSider extends React.Component<any, any>{
  render = () => {
    return (
      <Sider theme="light" className="sider" >
        <div className="logo">FE-MONITOR</div>
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <Link to="/exp/web"><span>My Web</span></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <DesktopOutlined />
            <Link to="/exp/perf"><span>Access Speed</span></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <BugOutlined />
            <Link to="/exp/err"><span>JS Error</span></Link>
          </Menu.Item>
          <Menu.Item key="4">
            <LineChartOutlined />
            <Link to="/exp/res"> <span>Resource Detail</span></Link>
          </Menu.Item>
          <Menu.Item key="5">
            <SettingOutlined />
            <Link to="/exp/conf"><span>Configuration</span></Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}