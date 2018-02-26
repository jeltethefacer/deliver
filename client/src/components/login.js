import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions";

class Login extends Component {
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
    this.props.login(this.state.valueEmail, this.state.valuePassword);
    this.props.history.push("/");
    event.preventDefault();
  }

  render() {
    return (
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
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(login(username, password));
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);
