import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  handleLogout = () => {
    window.sessionStorage.removeItem("jwt");
    window.sessionStorage.removeItem("state");
    window.location.reload();
  };

  handleCompleted = () => {};

  renderMenu = () => {
    if (!!window.sessionStorage.jwt) {
      return (
        <>
          <Link to="/" onClick={this.handleLogout} id="logout">
            Logout
          </Link>
          <Link to="/" id="home-nav">
            Home
          </Link>
          <Link to="/completed-projects" id="completed-nav">
            Completed
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link
            to="/"
            onClick={this.handleLogout}
            className="hidden-logout"
            id="logout"
            disable="true"
          />
        </>
      );
    }
  };
  render() {
    return (
      <header className="header" id="header">
        <span className="logo">PROJECT TRACKER</span>

        <div className="nav">{this.renderMenu()}</div>
      </header>
    );
  }
}

export default Header;
