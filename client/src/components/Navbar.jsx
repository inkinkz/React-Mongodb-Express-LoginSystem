import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <ul className="font-mukta">
        <li className="active">
          <Link to="/">Fancy App</Link>
        </li>
        <li>
          <Link to="/users/login">Login</Link>
        </li>
        <li>
          <Link to="/users/register">Register</Link>
        </li>
      </ul>
    );
  }
}

export default withRouter(Navbar);
