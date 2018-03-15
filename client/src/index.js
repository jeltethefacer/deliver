import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import Items from "./components/items";
import Checkout from "./components/checkout";
import Orders from "./components/orders";
import Admin from "./components/admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//eslint-disable-next-line
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
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/items" component={Items} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/admin" component={Admin} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
