import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { translate } from "react-i18next";

class Navbar extends Component {
  logOut(e) {
    e.preventDefault();
    sessionStorage.clear();
    this.props.history.push(`/users/login`);
    console.log("logged out");
  }
  render() {
    const { t, i18n } = this.props;

    var loggedIn = <li />;
    if (sessionStorage.getItem("name") !== null) {
      loggedIn = (
        <div>
          <li>
            <Link to="#">{`${t("GREETING")} ${sessionStorage.getItem(
              "name"
            )}`}</Link>
          </li>
          <li>
            <Link to="/users/member">{t("MEMBER")}</Link>
          </li>
          <li onClick={this.logOut.bind(this)}>
            <Link to="#">{t("LOGOUT")}</Link>
          </li>
        </div>
      );
    }

    const loginRegLink = (
      <div>
        <li>
          <Link to="/users/login">{t("LOGIN")}</Link>
        </li>
        <li>
          <Link to="/users/register">{t("REGISTER")}</Link>
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

export default translate("translations")(withRouter(Navbar));
