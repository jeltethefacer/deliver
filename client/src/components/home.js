import React, { Component } from "react";
import { connect } from "react-redux";
import { checkIfLoggedIn } from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.checkIfLoggedIn();
  }

  render() {
    if (this.props.front_name) {
      return (
        <div>
          first name: {this.props.front_name}
          <br />
          email: {this.props.email}
          <br />
          <a href="/api/logout">logout</a>
        </div>
      );
    } else {
      return (
        <div>
          <a href="/login">login</a>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    front_name: state.user.front_name,
    email: state.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn())
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(App);

export default VisibleTodoList;
