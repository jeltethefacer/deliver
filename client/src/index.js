import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/home";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
