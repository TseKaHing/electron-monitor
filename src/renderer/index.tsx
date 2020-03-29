import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import { createHashHistory } from 'history'

import App from './component/app/app'
const history = createHashHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>
  ,
  document.getElementById('app')
);
