import React, { Component } from "react";
import axios from "axios";
import { translate } from "react-i18next";
import { Redirect } from "react-router-dom";

class Register extends Component {
  isEnabled = false;
  userExisted = false;

  emailError = false;
  pwError = false;

  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      redirect: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    switch (event.target.name) {
      case "email":
        if (
          !event.target.value.match(
            /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
          )
        ) {
          console.log("Invalid Email");
          this.emailError = true;
        } else {
          this.emailError = false;
        }
        break;
      case "password2":
        if (this.state.password !== event.target.value) {
          console.log("passwords not matched!");
          // console.log(
          //   `pw = ${this.state.password} pw2 = ${event.target.value}`
          // );
          this.pwError = true;
        } else {
          this.pwError = false;
        }
        break;
      case "password":
        if (this.state.password2 !== event.target.value) {
          console.log("passwords not matched!");
          // console.log(
          //   `pw = ${this.state.password} pw2 = ${event.target.value}`
          // );
          this.pwError = true;
        } else {
          this.pwError = false;
        }
        break;
      default:
        break;
    }
    this.checkState();
  }

  checkState() {
    if (
      this.state.name !== "" &&
      this.state.password2 !== "" &&
      this.state.email !== "" &&
      !this.emailError &&
      !this.pwError
    ) {
      this.isEnabled = true;
    } else {
      this.isEnabled = false;
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      password: this.state.password
    };
    axios
      .post("register", {
        name: user.name,
        email: user.email,
        password: user.password
      })
      .then(res => {
        if (res.data.error === "User already exists") {
          this.userExisted = true;
          this.props.history.push("/users/register");
        } else {
          this.setState({
            redirect: "/users/login"
          });
        }
      });
  }

  render() {
    const { t } = this.props;

    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div>
              <p
                className={`errorMessage ${!this.userExisted ? "hidden" : ""}`}
              >
                {t("USER_EXISTED")}
              </p>
              <h1 className="font-mukta">{t("REGISTER")}</h1>
              <p className="font-mukta">{t("FILL_FORM_MESSAGE")}</p>
              <label htmlFor="name">
                <b className="font-mukta">{t("NAME")}</b>
                <br />
              </label>
              <input
                className="font-mukta"
                type="text"
                placeholder={t("ENTER_NAME")}
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              <br />
              <label htmlFor="email">
                <b className="font-mukta">{t("EMAIL")}</b>
                <br />
              </label>
              <div>
                <p
                  id="emailError"
                  className={`errorMessage ${!this.emailError ? "hidden" : ""}`}
                >
                  {t("INVALID_EMAIL")}
                </p>
              </div>
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
              <label htmlFor="password2">
                <b className="font-mukta">{t("CONFIRM_PASSWORD")}</b>
                <br />
              </label>
              <div>
                <p
                  id="pwError"
                  className={`errorMessage ${!this.pwError ? "hidden" : ""}`}
                >
                  {t("PASSWORDS_NOT_MATCH")}
                </p>
              </div>
              <input
                className="font-mukta"
                type="password"
                placeholder={t("PASSWORD_AGAIN")}
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
              <button
                className="font-mukta registerbtn"
                type="submit"
                name="submit"
                disabled={!this.isEnabled}
              >
                {t("REGISTER")}
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default translate("translations")(Register);
