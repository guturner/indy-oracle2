import React from "react";
import ReactDOM from "react-dom";
import HttpsRedirect from 'react-https-redirect';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, withRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";
import Firebase, { FirebaseContext } from "./firebase";

var hist = createBrowserHistory();

hist.listen((location, action) => {
  console.log(location.pathname, location, action);
});

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <HttpsRedirect>
        <Router history={hist}>
          <Switch>
            {indexRoutes.map((prop, key) => {
              return <Route path={prop.path} key={key} component={withRouter(prop.component)} />;
            })}
          </Switch>
        </Router>
      </HttpsRedirect>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);
