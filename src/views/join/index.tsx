import * as React from 'react'
import ResumeCard from './component/card'
import './index.less'
import md from './README.md'
const ReactMarkdown = require('react-markdown')
import '@public/markdown.less'
import { Card } from 'antd'
export default class Join extends React.Component<any, any>{
  render = () => {
    return (
      <section className="main join">
        <div className="left"></div>
        <div className="center">
          <ResumeCard />
          <Card style={{ overflowY: 'scroll', position: 'relative', top: '1rem', width: '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', transition: '0.3s', borderRadius: '5px' }} >
            <ReactMarkdown
              source={md}
              escapeHtml={true}
            >
            </ReactMarkdown>
          </Card>
        </div>
        <div className="right"></div>
      </section>
    )
  }
}