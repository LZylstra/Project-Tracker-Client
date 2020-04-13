import React, { Component } from "react";
import ApiContext from "../ApiContext";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    submitted: false,
    error: "",
  };
  static contextType = ApiContext;

  //State change methods
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value, submitted: false });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value, submitted: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.context.login(this.state.email, this.state.password).then((res) => {
      if (!!res.error) {
        this.setState({ error: res.error, submitted: true });
        return;
      }
      this.props.history.goBack();
    });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="login">
        <p className="demoinfo">
          Want to try it out before registering? Use the following log ins:
        </p>
        <p className="demoinfo">
          Admin User <br></br> Email: demo-admin@demo.com Password: password
        </p>
        <p className="demoinfo">
          Non Admin User <br></br> Email: demo@demo.com Password: password
        </p>
        <form id="login-form" onSubmit={this.handleSubmit}>
          {this.state.submitted && <p className="error">{this.state.error}</p>}
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
          <div className="login-button-wrapper">
            <button>Login</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
          <Link to="/SignUp" id="signup-nav">
            <h6>Not registered? Create an account</h6>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
