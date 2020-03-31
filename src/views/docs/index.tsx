import * as React from 'react'
import md from './README.md'
const ReactMarkdown = require('react-markdown') //  使用import导入报语法错
import '@public/markdown.less'
import './index.less'

export default class Docs extends React.Component<any, any>{
  constructor(props: any) {
    super(props);
  }
  render = () => {
    return (
      <div className="layout main">
        <ReactMarkdown
          source={md}
          escapeHtml={true}
        >
        </ReactMarkdown>
      </div>
    )
  }
}