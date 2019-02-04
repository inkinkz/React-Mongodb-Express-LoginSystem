import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  logOut(e) {
    e.preventDefault();
    sessionStorage.clear();
    this.props.history.push(`/`);
    console.log("logged out");
  }
  render() {
    var loggedIn = <li />;
    if (sessionStorage.getItem("name") !== null) {
      loggedIn = (
        <div>
          <li>
            <Link to="#">{`Hi, ${sessionStorage.getItem("name")}`}</Link>
          </li>
          <li>
            <Link to="/users/member">Member</Link>
          </li>
          <li onClick={this.logOut.bind(this)}>
            <Link to="#">Logout</Link>
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
          {sessionStorage.name ? loggedIn : loginRegLink}
        </ul>
      </div>
    );
  }
}

export default withRouter(Navbar);
