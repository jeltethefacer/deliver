import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import Items from "./components/items";
import Checkout from "./components/checkout";
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
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/Items" component={Items} />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
