import React, { Component } from "react";
import axios from "axios";

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
      password2: ""
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
          console.log(
            `pw = ${this.state.password} pw2 = ${event.target.value}`
          );
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
    // console.log("state checked");
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
        console.log(res.data.error);
        if (res.data.error === "User already exists") {
          this.userExisted = true;
          this.props.history.push("/users/register");
        } else {
          this.props.history.push("/users/login");
        }
      });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div>
            <p className={`errorMessage ${!this.userExisted ? "hidden" : ""}`}>
              ERROR: User existed !
            </p>
            <h1 className="font-mukta">Register</h1>
            <p className="font-mukta">Fill the form below to register.</p>
            <label htmlFor="name">
              <b className="font-mukta">Name</b>
              <br />
            </label>
            <input
              className="font-mukta"
              type="text"
              placeholder="#{translation.ENTER_NAME}"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            <br />
            <label htmlFor="email">
              <b className="font-mukta">Email</b>
              <br />
            </label>
            <div>
              <p
                id="emailError"
                className={`errorMessage ${!this.emailError ? "hidden" : ""}`}
              >
                Please enter a valid email address.
              </p>
            </div>
            <input
              className="font-mukta"
              type="text"
              placeholder="#{translation.ENTER_EMAIL}"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <br />
            <label htmlFor="password">
              <b className="font-mukta">Password</b>
              <br />
            </label>
            <input
              className="font-mukta"
              type="password"
              placeholder="#{translation.ENTER_PASSWORD}"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <label htmlFor="password2">
              <b className="font-mukta">Confirm your Password</b>
              <br />
            </label>
            <div>
              <p
                id="pwError"
                className={`errorMessage ${!this.pwError ? "hidden" : ""}`}
              >
                Passwords not match.
              </p>
            </div>
            <input
              className="font-mukta"
              type="password"
              placeholder="#{translation.PASSWORD_AGAIN}"
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
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
