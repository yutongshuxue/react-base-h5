import React, { Fragment,Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/home';
const Login = React.lazy(() => import('./pages/login'))

function App() {
  return (
    <Fragment>
      <Router>
        <Suspense fallback='loading...'>
          <Switch>
            <Redirect  exact from='/' to='/home' component={Home}></Redirect>
            <Route path='/home' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
          </Switch>
        </Suspense>
      </Router>
    </Fragment>
  );
}

export default App;
