import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkIfLoggedIn, changePage } from "../actions";
import NavBar from "./sub_components/navbar";

class Admin extends Component {
  componentDidMount() {
    this.props.changePage("/");
    this.props.checkIfLoggedIn();
  }

  render() {
    if (this.props.loginStatus === 3) {
      return <div>loading</div>;
    } else if (this.props.role !== "admin") {
      return <Redirect to="/" />;
    }
    return <NavBar />;
  }
}

const mapStateToProps = state => {
  return {
    front_name: state.user.front_name,
    last_name: state.user.last_name,
    email: state.user.email,
    role: state.user.role,
    loggedIn: state.user.loggedIn,
    loginStatus: state.user.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    changePage: page => dispatch(changePage(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
