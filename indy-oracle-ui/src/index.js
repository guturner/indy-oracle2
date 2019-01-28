import React from "react";
import ReactDOM from "react-dom";
import HttpsRedirect from 'react-https-redirect';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";
import Firebase, { FirebaseContext } from "./firebase";

var hist = createBrowserHistory();

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <HttpsRedirect>
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} key={key} component={prop.component} />;
          })}
        </Switch>
      </Router>
    </HttpsRedirect>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
