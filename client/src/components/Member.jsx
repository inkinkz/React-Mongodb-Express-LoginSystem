import React, { Component } from "react";
import axios from "axios";
import { translate } from "react-i18next";
import { Redirect } from "react-router-dom";

class Member extends Component {
  isMatch = false;
  isEnabled = false;
  isChanged = false;
  notMatched = false;
  constructor() {
    super();
    this.state = {
      currentPassword: "",
      password: "",
      password2: "",
      redirect: null
    };
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("email") === null) {
      this.setState({
        redirect: "/users/login"
      });
    } else {
      this.setState({
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email")
      });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    // console.log("pw1 = " + this.state.password);
    // console.log("pw2 = " + this.state.password2);

    //change on confirm password
    if (event.target.name === "password2") {
      if (this.state.password !== event.target.value) {
        console.log("passwords not matched!");
        console.log(`pw = ${this.state.password} pw2 = ${event.target.value}`);
        this.isMatch = true;
      } else {
        this.isMatch = false;
      }
    }

    //change on password field
    if (event.target.name === "password") {
      if (this.state.password2 !== event.target.value) {
        console.log("passwords not matched!");
        // console.log(`pw = ${this.state.password} pw2 = ${event.target.value}`);
        this.isMatch = true;
      } else {
        this.isMatch = false;
      }
    }
    this.checkState();
  }

  checkState() {
    // console.log("state checked");
    if (!this.isMatch && this.state.password2 !== "") {
      this.isEnabled = true;
    } else {
      this.isEnabled = false;
    }
  }

  onPasswordChange(e) {
    e.preventDefault();
    axios
      .post("member", {
        user: localStorage.getItem("user"),
        currentPassword: this.state.currentPassword,
        password: this.state.password,
        type: "changePassword"
      })
      .then(res => {
        console.log(res);
        if (res.data === "password changed") {
          this.isChanged = true;
          this.notMatched = false;
          document.getElementById("changePasswordForm").reset();

          this.props.history.push("/users/member");
        } else if (res.data === "current password not matched") {
          this.notMatched = true;
          this.isChanged = false;
          this.props.history.push("/users/member");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onDelete(e) {
    e.preventDefault();
    axios
      .post("member", {
        user: localStorage.getItem("user"),
        type: "delete"
      })
      .then(res => {
        console.log(res);
        if (res.data === "deleted") {
          alert("Account Deleted Successfully!");
          localStorage.clear();
          this.setState({
            redirect: "/"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          <form id="changePasswordForm" onSubmit={this.onPasswordChange}>
            <div className="container">
              <h1 className="font-mukta">{`${t("GREETING")} ${
                this.state.name
              }`}</h1>
              <h4 className="font-mukta">{`Email: ${this.state.email}`}</h4>
              <p
                id="isChanged"
                className={`errorMessage ${!this.isChanged ? "hidden" : ""}`}
              >
                {t("PASSWORD_CHANGED_SUCCESSFULLY")}
              </p>
              <p
                id="notMatched"
                className={`errorMessage ${!this.notMatched ? "hidden" : ""}`}
              >
                {t("INCORRECT_CURRENT_PASSWORD")}
              </p>
              <h1 className="font-mukta">{t("CHANGE_PASSWORD")}</h1>
              <h3 className="font-mukta">{t("ENTER_NEW_PASSWORD_BELOW")}</h3>
              <label htmlFor="currentPassword">
                <b className="font-mukta">{t("CURRENT_PASSWORD")}</b>
                <br />
              </label>
              <input
                className="font-mukta"
                type="password"
                placeholder={t("ENTER_CURRENT_PASSWORD")}
                name="currentPassword"
                onChange={this.onChange}
              />
              <br />
              <label htmlFor="password">
                <b className="font-mukta">{t("NEW_PASSWORD")}</b>
                <br />
              </label>
              <input
                className="font-mukta"
                type="password"
                placeholder={t("ENTER_NEW_PASSWORD")}
                name="password"
                onChange={this.onChange}
              />
              <br />
              <label htmlFor="password2">
                <b className="font-mukta">{t("ENTER_NEW_PASSWORD")}</b>
                <br />
              </label>
              <p
                id="pwError"
                className={`errorMessage ${!this.isMatch ? "hidden" : ""}`}
              >
                {t("PASSWORDS_NOT_MATCH")}
              </p>
              <input
                className="font-mukta"
                type="password"
                placeholder={t("CONFIRM_NEW_PASSWORD")}
                name="password2"
                onChange={this.onChange}
              />
              <button
                className="font-mukta registerbtn"
                type="submit"
                name="changePw"
                disabled={!this.isEnabled}
              >
                {t("CHANGE_PASSWORD")}
              </button>
              <br />
              <br />
              <hr />
            </div>
          </form>
          <form onSubmit={this.onDelete}>
            <div className="container">
              <h1 className="font-mukta">{t("DELETE_ACCOUNT")}</h1>
              <p className="font-mukta">{t("DELETE_ACCOUNT_MESSAGE")} </p>
              <button
                className="font-mukta registerbtn"
                type="submit"
                name="deleteAcc"
              >
                {t("DELETE_ACCOUNT")}
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default translate("translations")(Member);
