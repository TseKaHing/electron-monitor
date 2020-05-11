import * as React from 'react'
import { Layout } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import Config from '../components/configuration'
import Web from '../components/web'
import Performance from '../components/performance'
import Resource from '../components/resource'
import Error from '../components/error'
const { Content } = Layout
interface IState {
  webs: Array<any>,
  visible: boolean,
  _input: string
}
export default class ExpContent extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
  }

  render = () => {
    return (
      <Content style={{ margin: '1.5rem 1rem 0', background: '#fff', height: 'calc(100% - 4rem)' }}>
        <Switch >
          <Route exact path="/exp/web" component={Web} />
          <Route exact path="/exp/perf" component={Performance} />
          <Route exact path="/exp/err" component={Error} />
          <Route exact path="/exp/res" component={Resource} />
          <Route exact path='/exp/conf' component={Config} />
          <Redirect exact from="/exp" to="/exp/web" />
        </Switch>
      </Content>
    )
  }
}