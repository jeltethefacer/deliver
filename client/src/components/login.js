import React, { Component } from "react";

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
    alert(
      `email: ${this.state.valueEmail} password: ${this.state.valuePassword}`
    );
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

export default Login;
