import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { translate } from "react-i18next";

class Navbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push(`/users/login`);
    console.log("logged out");
  }
  render() {
    const { t, i18n } = this.props;

    const switchingLanguage = () => {
      var selectedLanguage = document.getElementById("langselector").value;
      if (selectedLanguage.length === 2) {
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem("selectedLanguage", selectedLanguage);
      }
    };

    var loggedIn = <li />;
    if (localStorage.getItem("name") !== null) {
      loggedIn = (
        <div>
          <li>
            <Link to="#">{`${t("GREETING")} ${localStorage.getItem(
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
          {localStorage.name ? loggedIn : loginRegLink}
          <select
            align="center"
            id="langselector"
            onChange={() => switchingLanguage(this)}
          >
            <option value="" disabled="disabled">
              Fancy App
            </option>
            <option>{t("SELECT_LANGUAGE")}</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="jp">日本語 </option>
            <option value="ch">中文</option>
            <option value="kr">한국어</option>
            <option value="th">ไทย</option>
          </select>
        </ul>
      </div>
    );
  }
}

export default translate("translations")(withRouter(Navbar));
