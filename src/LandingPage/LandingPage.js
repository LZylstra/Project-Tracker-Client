import React, { Component } from "react";
import "./LandingPage.css";
import PT from "../PT.png";

class LandingPage extends Component {
  onLogin = () => {
    this.props.history.push("/Login");
  };

  onRegister = () => {
    this.props.history.push("/SignUp");
  };

  render() {
    return (
      <div className="landing-page">
        <div className="greeting">
          <p id="greeting-header" className="greeting-header">
            Welcome to
          </p>
          <p className="project-tracker-heading">Project Tracker</p>
          <p id="description">
            This app is a collaborative project tracking app. Everyone whose
            account was created with the same company name will see the same
            data.
            <br />
            Admins will have certain abilities that standard users do not have
            such as project deletion. As of right now the only admin is the
            person who
            <br /> created the company when registering.
          </p>
          <img src={PT} alt="puzzle" className="Pt-image" />
          <div className="button-wrapper">
            <button onClick={this.onLogin}>Login</button>
            <button onClick={this.onRegister}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
