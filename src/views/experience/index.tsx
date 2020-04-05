import * as React from 'react'
import ExpSider from './sider'
import ExpContent from './content'

import './index.less'
export default class Exp extends React.Component<any, any>{
  render = () => {
    return (
      <div className="main exp">
        <ExpSider></ExpSider>
        <ExpContent></ExpContent>
      </div>
    )
  }
}