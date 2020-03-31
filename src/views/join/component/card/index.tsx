import * as React from 'react'
import './index.less'
import Activity from './../activity'
import { Tag, Card } from 'antd'
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  GithubOutlined,
  LinkOutlined,
  TagsOutlined,
  EditOutlined,
  EnvironmentOutlined
} from '@ant-design/icons'
export default class ResumeCard extends React.Component<any, any>{
  render = () => {
    return (
      <Card className="resume-wrapper">
        <div className="resume-header">
          <div className="resume-avatar"></div>
          <div>
            <div className="resume-line">
              <UserOutlined className="resume-icon" />
              <label>ThinkBig</label>
            </div>
            <div className="resume-line">
              <EnvironmentOutlined className="resume-icon" />
              <label>Guangdong</label>
            </div>
            <div className="resume-line">
              <EditOutlined className="resume-icon" />
              <label>A front-end learner</label>
            </div>
            <div className="resume-line">
              <PhoneOutlined className="resume-icon" />
              <label>13143103593</label>
            </div>
          </div>
        </div>
        <main className="resume-main">
          <div className="resume-line">
            <GithubOutlined className="resume-icon" />
            <a style={{ color: '#545454' }} href="https://github.com/jazzyXie"><label>github.com/jazzyXie</label></a>
          </div>
          <div className="resume-line">
            <LinkOutlined className="resume-icon" />
            <a style={{ color: '#545454' }} href="http://thinkingbig.club"><label>thinkingbig.club</label></a>
          </div>
          <div className="resume-line">
            <MailOutlined className="resume-icon" />
            <label>thinkbig1243756230@gmail.com</label>
          </div>
          <div className="resume-line">
            <TagsOutlined className="resume-icon" />
            <Tag color="geekblue">Node</Tag>
            <Tag color="purple">TS</Tag>
            <Tag color="magenta">React</Tag>
            <Tag color="gold">Vue</Tag>
            <Tag color="lime">Electron</Tag>
          </div>
          <Activity />
        </main>
      </Card >
    )
  }
}