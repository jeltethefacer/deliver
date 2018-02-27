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
      valuePasswordValidation: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      passwordValidationError: "",
      warning: ""
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
      this.state.valueFirstName.length < 2 ||
      this.state.valueFirstName.length > 20
    ) {
      ++error;
      this.setState({
        firstNameError: "De naam moet tussen de 2 en de 20 tekens lang zijn."
      });
    }
    if (
      this.state.valueLastName.length < 2 ||
      this.state.valueLastName.length > 20
    ) {
      ++error;
      this.setState({
        lastNameError: "De naam moet tussen de 2 en de 20 tekens lang zijn."
      });
    }
    if (this.state.valueEmail.length < 4 || this.state.valueEmail.length > 40) {
      ++error;
      this.setState({
        emailError: "De email moet tussen de 4 en de 40 tekens lang zijn."
      });
    }
    if (
      this.state.valuePassword.length < 6 ||
      this.state.valuePassword.length > 20
    ) {
      ++error;
      this.setState({
        passwordError:
          "Het wachtwoord moet tussen de 3 en de 20 tekens lang zijn."
      });
    }
    if (this.state.valuePassword !== this.state.valuePasswordValidation) {
      ++error;
      this.setState({
        passwordValidationError: "de wachtwoorden moet hetzelfde zijn"
      });
    }
    if (error === 0) {
      this.props.register(
        this.state.valueFirstName,
        this.state.valueLastName,
        this.state.valueEmail.toLowerCase(),
        this.state.valuePassword
      );
    }

    event.preventDefault();
  }

  render() {
    let warning = "";
    if (this.props.loggedIn || this.props.registerStatus === 1) {
      return <Redirect to="/" />;
    }
    if (this.props.registerStatus === 2) {
      warning = (
        <div className="alert alert-danger">
          <strong>waarschuwing!</strong> Het email adres wat u wilt gebruiken is
          nog in gebruik{" "}
        </div>
      );
    }
    return (
      <div>
        {warning}
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
            <small className="text-danger">{this.state.firstNameError}</small>
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
            <small className="text-danger">{this.state.lastNameError}</small>
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
            <small className="text-danger">{this.state.emailError}</small>
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
            <small className="text-danger">{this.state.passwordError}</small>
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
            <small className="text-danger">
              {this.state.passwordValidationError}
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
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
