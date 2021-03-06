import React, { Component } from "react";
import { connect } from "react-redux";
import { checkIfLoggedIn, changePage } from "../actions";
import NavBar from "./sub_components/navbar";

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.changePage("/");
    this.props.checkIfLoggedIn();
  }

  render() {
    return <NavBar />;
  }
}

const mapStateToProps = state => {
  return {
    front_name: state.user.front_name,
    last_name: state.user.last_name,
    email: state.user.email,
    role: state.user.role,
    loginStatus: state.user.loginStatus,
    loggedIn: state.user.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    changePage: page => dispatch(changePage(page))
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(App);

export default VisibleTodoList;
