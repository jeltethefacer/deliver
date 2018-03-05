import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import Items from "./components/items";
import Checkout from "./components/checkout";
import Orders from "./components/orders";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Css from "./App.css";

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
        <Route exact path="/items" component={Items} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/orders" component={Orders} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
