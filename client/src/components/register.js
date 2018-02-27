import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register, checkIfLoggedIn } from "../actions";

class Register extends Component {
  componentDidMount() {
    this.props.checkIfLoggedIn();
  }

  constructor(props) {
    super(props);
    this.state = {
      valueFirstName: "",
      valueLastName: "",
      valueEmail: "",
      valuePassword: "",
      valuePasswordValidation: ""
    };

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordValidation = this.handleChangePasswordValidation.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFirstName(event) {
    this.setState({ valueFirstName: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ valueLastName: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ valueEmail: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ valuePassword: event.target.value });
  }

  handleChangePasswordValidation(event) {
    this.setState({ valuePasswordValidation: event.target.value });
  }

  handleSubmit(event) {
    var error = 0;
    if (
      this.state.valueFirstName.length < 4 ||
      this.state.valueFirstName.length > 21
    ) {
      ++error;
    }
    if (
      this.state.valueLastName.length < 4 ||
      this.state.valueLastName.length > 21
    ) {
      ++error;
    }
    if (this.state.valueEmail.length < 4 || this.state.valueEmail.length > 40) {
      ++error;
    }
    if (
      this.state.valuePassword.length < 6 ||
      this.state.valueLastName.length > 21
    ) {
      ++error;
    }
    if (this.state.valuePassword !== this.state.valuePasswordValidation) {
      ++error;
    }
    if (error === 0) {
      this.props.register(
        this.state.valueFirstName,
        this.state.valueLastName,
        this.state.valueEmail,
        this.state.valuePassword
      );
    }

    event.preventDefault();
  }

  render() {
    if (this.props.loggedIn || this.props.registerStatus === 1) {
      return <Redirect to="/" />;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="frontName">voornaam</label>
            <input
              type="text"
              className="form-control"
              id="frontName"
              value={this.state.value}
              onChange={this.handleChangeFirstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">achternaam</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={this.state.value}
              onChange={this.handleChangeLastName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.value}
              onChange={this.handleChangeEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">wachtwoord</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={this.state.value}
              onChange={this.handleChangePassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordValidation">wachtwoord controle</label>
            <input
              type="password"
              id="passwordValidation"
              className="form-control"
              value={this.state.value}
              onChange={this.handleChangePasswordValidation}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    registerStatus: state.register.registerStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    register: (firstName, lastName, email, password) =>
      dispatch(register(firstName, lastName, email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
