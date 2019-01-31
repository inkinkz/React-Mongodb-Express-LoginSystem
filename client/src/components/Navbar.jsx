import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

class Navbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }
  render() {
    var loggedIn = <li />;
    if (localStorage.getItem("usertoken") !== null) {
      loggedIn = (
        <div>
          <li>
            <Link to="#">{`Hi, ${
              jwt_decode(localStorage.usertoken).name
            }`}</Link>
          </li>
          <li>
            <Link to="/users/member">Member</Link>
          </li>
          <li>
            <a onClick={this.logOut.bind(this)}>Logout</a>
          </li>
        </div>
      );
    }

    const loginRegLink = (
      <div>
        <li>
          <Link to="/users/login">Login</Link>
        </li>
        <li>
          <Link to="/users/register">Register</Link>
        </li>
      </div>
    );

    return (
      <div>
        <ul className="font-mukta">
          <li className="active">
            <Link to="/">Fancy App</Link>
          </li>
          {localStorage.usertoken ? loggedIn : loginRegLink}
          {/* {loginRegLink}
          <li>
            <a href="" onClick={this.logOut.bind(this)}>
              Logout
            </a>
          </li> */}
        </ul>
      </div>
    );
  }
}

export default withRouter(Navbar);
