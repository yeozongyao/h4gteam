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
<<<<<<< HEAD
import ActivitiesPage from './views/activities-page'
import CertPage from './views/CertPage'
=======
import ProfilesPage from './views/profilespage'
>>>>>>> 0f9334b (test)

const App = () => {
  return (
    <Router>
      <Switch>
<<<<<<< HEAD
      <Route component={LandingPage} exact path="/" />
        <Route component={ActivitiesPage} exact path="/act" />
        <Route component={CertPage} exact path="/cert" />
=======
        <Route component={LandingPage} exact path="/" />
        <Route component={ProfilesPage} exact path="/profiles" />
>>>>>>> 0f9334b (test)
        <Route component={NotFound} path="**" />

        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
