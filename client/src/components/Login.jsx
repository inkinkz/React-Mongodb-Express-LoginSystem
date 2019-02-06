import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { translate } from "react-i18next";

class Login extends Component {
  failed = false;
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirect: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("email") === null) {
    } else {
      this.setState({
        redirect: "/users/member"
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    axios
      .post("login", {
        email: this.state.email.toLowerCase(),
        password: this.state.password
      })
      .then(res => {
        console.log(res.data.name + " logged in");
        if (res.status === 200) {
          localStorage.setItem("user", res.data);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
          // update the state to redirect to home
          this.setState({
            redirect: "/users/member"
          });
        }
      })
      .catch(err => {
        this.failed = true;
        this.props.history.push("/users/login");
        console.log(err);
        console.log("caught > login error");
      });
  }

  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <form onSubmit={this.onSubmit}>
          <div className="container">
            <p className={`errorMessage ${!this.failed ? "hidden" : ""}`}>
              {t("INCORRECT_LOGIN")}
            </p>
            <h1 className="font-mukta">{t("LOGIN")}</h1>
            <p className="font-mukta">{t("LOGIN_ENTER_EMAIL")}</p>
            <label htmlFor="email">
              <b className="font-mukta">{t("EMAIL")}</b>
              <br />
            </label>
            <input
              className="font-mukta"
              type="text"
              placeholder={t("ENTER_EMAIL")}
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <br />
            <label htmlFor="password">
              <b className="font-mukta">{t("PASSWORD")}</b>
              <br />
            </label>
            <input
              className="font-mukta"
              type="password"
              placeholder={t("ENTER_PASSWORD")}
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <button
              className="font-mukta registerbtn"
              type="submit"
              name="submit"
            >
              {t("LOGIN")}
            </button>
          </div>
        </form>
      );
    }
  }
}

export default translate("translations")(Login);
