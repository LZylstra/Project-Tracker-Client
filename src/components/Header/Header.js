import React, { Component } from "react";
import ApiContext from "../../context/ApiContext";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  static contextType = ApiContext;

  handleLogout = () => {
    window.sessionStorage.removeItem("jwt");
    window.sessionStorage.removeItem("state");
    window.location.reload();
  };

  renderMobileMenu = () => {
    return (
      <button onClick={this.context.handleMobileMenu} id="hamburger-menu">
        <img src="/hamburger.png" alt="hamburger menu" className="icon" />
      </button>
    );
  };

  renderMenu = () => {
    if (!!window.sessionStorage.jwt) {
      if (this.context.getIsMobile()) {
        return this.renderMobileMenu();
      }
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
          {this.context.getisAdmin() && (
            <Link
              to="/"
              onClick={this.context.handleManageUsers}
              id="manage-users"
            >
              Manage Users
            </Link>
          )}
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
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&display=swap');
        </style>

        <span className="logo">
          <i className="fas fa-address-book" alt="Project icon"></i> PROJECT
          TRACKER
        </span>

        <div className="nav">{this.renderMenu()}</div>
      </header>
    );
  }
}

export default Header;
