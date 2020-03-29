import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '@views/home'
import Docs from '@views/docs'
import Exp from '@views/experience'
import Join from '@views/join'

export default class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path='/docs' component={Docs} />
        <Route path='/exp' component={Exp} />
        <Route path='/join' component={Join} />
        <Redirect path='/' to={{ pathname: 'home' }}></Redirect>
      </Switch>
    )
  }
}