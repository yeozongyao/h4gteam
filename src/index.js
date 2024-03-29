import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./style.css";
import LandingPage from "./views/landing-page";
import NotFound from "./views/not-found";
import ActivitiesPage from "./views/activities-page";
import CertPage from "./views/CertPage";
import ProfilesPage from "./views/profilespage";
import AdminCert from "./views/admin-cert";
import AdminEvents from "./views/admin-events";
import signin from "./views/signin";
import AdminAddEvents from "./views/admin-add-events";
import ViewProfilePage from "./views/viewprofile";
import RouteGuard  from "./components/RouteGuard";
import MyEvents from "./views/my-events";
import Dashboard from "./views/dashboard";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={LandingPage} exact path="/" />
        <Route component={ActivitiesPage} exact path="/act" />
        <Route component={CertPage} exact path="/cert" />
        <Route component={AdminCert} exact path="/admincert" />
        <Route component={AdminEvents} exact path="/adminevents" />
        <Route component={ProfilesPage} exact path="/profiles" />
        <Route component={signin} exact path="/signup" />
        <Route component={AdminAddEvents} exact path="/addevents" />
        <Route component={MyEvents} exact path="/myevents" />
        <Route component={Dashboard} exact path="/admindashboard" />
        <Route component={NotFound} path="**" />

        <Route
          path="/profiles/:userEmail"
          render={({ match }) => (
            <ViewProfilePage userEmail={match.params.userEmail} />
          )}
        />

        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
