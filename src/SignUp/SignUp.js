import React, { Component } from "react";
import ApiContext from "../ApiContext";
import { Link } from "react-router-dom";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    submitted: false,
    showPopUp: false,
  };

  static contextType = ApiContext;

  //State change methods
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value, submitted: false });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value, submitted: false });
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value, submitted: false });
  };

  handleCompanyChange = (event) => {
    this.setState({ companyName: event.target.value, submitted: false });
  };

  handleFullNameChange = (event) => {
    this.setState({ fullName: event.target.value, submitted: false });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    if (this.validateInput()) {
      return;
    }
    const newUser = {
      email: this.state.email.trim(),
      password: this.state.password,
      full_name: this.state.fullName.trim(),
      isadmin: false,
      company_name: this.state.companyName.trim(),
    };
    this.context.signUp(newUser).then((res) => {
      if (!!res.error) {
        this.setState({ showPopUp: true });
        return;
      }
      this.context.extractPayload(res);
      this.props.history.push("/");
    });
  };

  formatDateForAPI = (str) => {
    const [year, month, day] = str.split("-");
    return new Date(year, month - 1, day);
  };

  handleAddCompany = event => {
    event.preventDefault();
    const newUser = {
      email: this.state.email.trim(),
      password: this.state.password,
      full_name: this.state.fullName.trim(),
      isadmin: true,
      company_name: this.state.companyName.trim(),
    };
    this.context.addCompany(newUser.company_name).then((res) => {
      this.context.signUp(newUser).then((response) => {
        this.context.extractPayload(response);
        this.props.history.push("/");
      });
    });
  };

  handleDoNotAddCompany = () => {
    this.setState({ showPopUp: false });
  };

  renderPopUp = () => {
    return (
      <div className="pop-up">
        <p>
          This company does not exist. Would you like to create a new company
          named "{this.state.companyName}"
        </p>
        <button onClick={this.handleAddCompany}>Yes</button>
        <button onClick={this.handleDoNotAddCompany}>No</button>
      </div>
    );
  };

  //Validation methods
  validateEmail = () => {
    const domains = ["net", "com", "gov", "org", "edu", "us"];
    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      return "Must use a valid email address.";
    }
    let emailDomain = this.state.email.split(".");
    emailDomain = emailDomain[emailDomain.length - 1];
    if (!domains.includes(emailDomain)) {
      return "Email must use a valid domain";
    }
  };

  validateFullName = () => {
    if (this.state.fullName.length < 4) {
      return "Name must contain more than 3 characters";
    }
    if (!this.state.fullName.includes(" ")) {
      return "Please use both your first and last names";
    }
  };

  validatePassword = () => {
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
    if (this.state.password.length < 8) {
      return "Password must be longer than 8 characters";
    }
    if (this.state.password.length > 72) {
      return "Password must be less than 72 characters";
    }
    if (
      this.state.password.startsWith(" ") ||
      this.state.password.endsWith(" ")
    ) {
      return "Password must not start or end with empty spaces";
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(this.state.password)) {
      return "Password must contain one upper case, lower case, number and special character";
    }
  };

  validateConfirmPassword = () => {
    if (this.state.password !== this.state.confirmPassword) {
      return "Passwords do not match";
    }
  };

  validateCompany = () => {
    if (this.state.companyName.length < 3) {
      return "Company name must be at least 3 characters";
    }
  };

  validateInput = () => {
    return (
      !!this.validateCompany() ||
      !!this.validateConfirmPassword() ||
      !!this.validateEmail() ||
      !!this.validateFullName() ||
      !!this.validatePassword()
    );
  };

  inputValidation = (input) => {
    return !!input && this.state.submitted;
  };

  render() {
    const emailValidation = this.inputValidation(this.validateEmail());
    const fullNameValidation = this.inputValidation(this.validateFullName());
    const passwordValidation = this.inputValidation(this.validatePassword());
    const confirmPasswordVal = this.inputValidation(
      this.validateConfirmPassword()
    );
    const companyValidation = this.inputValidation(this.validateCompany());
    return (
      <div className="signup">
        <form id="signup-form" onSubmit={this.handleSubmit}>
          {this.state.showPopUp && this.renderPopUp()}
          {emailValidation && <p className="error">{this.validateEmail()}</p>}
          <label htmlFor="email-input" className="hidden-label">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            id="email-input"
            className="inputs"
            onChange={this.handleEmailChange}
            required
          />
          {fullNameValidation && (
            <p className="error">{this.validateFullName()}</p>
          )}
          <label htmlFor="full-name-input" className="hidden-label">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            id="full-name-input"
            className="inputs"
            onChange={this.handleFullNameChange}
            required
          />
          {passwordValidation && (
            <p className="error">{this.validatePassword()}</p>
          )}
          <label htmlFor="password-input" className="hidden-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password-input"
            className="inputs"
            onChange={this.handlePasswordChange}
            required
          />
          {confirmPasswordVal && (
            <p className="error">{this.validateConfirmPassword()}</p>
          )}
          <label htmlFor="confirm-password-input" className="hidden-label">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirm-password-input"
            className="inputs"
            onChange={this.handleConfirmPasswordChange}
            required
          />
          {companyValidation && (
            <p className="error">{this.validateCompany()}</p>
          )}
          <label htmlFor="company-input" className="hidden-label">
            Company
          </label>
          <input
            type="text"
            placeholder="Company"
            id="company-input"
            className="inputs"
            onChange={this.handleCompanyChange}
            required
          />
          <div className="signup-button-wrapper">
            <button disabled={this.state.showPopUp}>Register</button>
            <button onClick={this.handleCancel} disabled={this.state.showPopUp}>Cancel</button>
          </div>
          <Link to="/Login" id="login-nav">
            <h6>Already registered? Go to login page</h6>
          </Link>
        </form>
      </div>
    );
  }
}

export default SignUp;
