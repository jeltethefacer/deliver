import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";
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
    if (this.props.loggedIn) {
      return <Redirect to={this.props.currentPage} />;
    }

    let warning;
    if (this.props.loginStatus === 2) {
      warning = (
        <Message
          warning
          header="waarschuwing"
          content="Het wachtwoord of emailadres kloppen niet"
        />
      );
    }

    return (
      <div>
        {warning}
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>email: </label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChangeEmail}
            />
          </Form.Field>
          <Form.Field>
            <label>password:</label>
            <input
              type="password"
              value={this.state.value}
              onChange={this.handleChangePassword}
            />
          </Form.Field>

          <Button type="submit" primary>
            verstuur
          </Button>
          <Button as={Link} to={this.props.currentPage} negative>
            annuleer
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    loginStatus: state.user.loginStatus,
    currentPage: state.page.currentPage
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
