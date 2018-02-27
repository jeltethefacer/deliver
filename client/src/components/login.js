import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, checkIfLoggedIn } from "../actions";

class Login extends Component {
  componentDidMount() {
    this.props.checkIfLoggedIn();
  }

  constructor(props) {
    super(props);
    this.state = {
      valueEmail: "",
      valuePassword: ""
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ valueEmail: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ valuePassword: event.target.value });
  }

  handleSubmit(event) {
    this.props.login(
      this.state.valueEmail.toLowerCase(),
      this.state.valuePassword
    );
    event.preventDefault();
  }

  render() {
    let warning;
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    if (this.props.loginStatus === 2) {
      warning = (
        <div className="alert alert-danger">
          <strong>waarschuwing!</strong> het wachtwoord of emailadres kloppen
          niet
        </div>
      );
    }
    return (
      <div>
        {warning}
        <form onSubmit={this.handleSubmit}>
          <label>
            email:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChangeEmail}
            />
          </label>
          <label>
            password:
            <input
              type="password"
              value={this.state.value}
              onChange={this.handleChangePassword}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    loginStatus: state.user.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    login: (username, password) => {
      dispatch(login(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
