import React, { Component } from "react";
import "../styles/Header.css";
import { message } from "antd";
import { Navigate } from "react-router-dom";

class Header extends Component {
  state = {
    redirectToLogin: false,
  };

  logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    this.setState({ redirectToLogin: true }); // Trigger the redirect
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" />; // Redirect to login page
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container-fluid">
            <a
              className="navbar-brand display-2 text-dark fw-bold text-uppercase animated-logo"
              href="/"
            >
              Bitcoin Tracker
            </a>
            <button className="btn2 btn-warning custom-btn" onClick={this.logoutHandler}>
              <h4>Logout</h4>
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;