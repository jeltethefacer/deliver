import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/home";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import deliverApp from "./reducers";
let store = createStore(deliverApp, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
