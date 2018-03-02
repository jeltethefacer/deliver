import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { checkIfLoggedIn } from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.checkIfLoggedIn();
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div>
          first name: {this.props.front_name}
          <br />
          email: {this.props.email}
          <br />
          <Link to="/logout">logout</Link>
          <br />
          <Link to="/items">items</Link>
          <br />
          <Link to="/orders">Orders</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/login">login</Link>
          <br />
          <Link to="/register">register</Link>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    front_name: state.user.front_name,
    last_name: state.user.last_name,
    email: state.user.email,
    loggedIn: state.user.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn())
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(App);

export default VisibleTodoList;
