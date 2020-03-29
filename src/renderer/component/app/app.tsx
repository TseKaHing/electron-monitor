import * as React from 'react'
import './app.less'
import Header from '../header'
import Main from '../main'

export default class Home extends React.Component<any, any>{
  render = () => {
    return (
      <div className='app'>
        <Header></Header>
        <Main></Main>
      </div>
    )
  }
}