import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import LandingPage from './views/landing-page'
import NotFound from './views/not-found'
import ActivitiesPage from './views/activities-page'
import CertPage from './views/CertPage'
import ProfilesPage from './views/profilespage'

const App = () => {
  return (
    <Router>
      <Switch>
      <Route component={LandingPage} exact path="/" />
        <Route component={ActivitiesPage} exact path="/act" />
        <Route component={CertPage} exact path="/cert" />
        <Route component={ProfilesPage} exact path="/profiles" />
        <Route component={NotFound} path="**" />

        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
