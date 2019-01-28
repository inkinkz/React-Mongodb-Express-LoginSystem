import React, { Component } from "react";
import { register } from "./UserFunctions";
import { Redirect } from "react-router-dom";

class Register extends Component {
  isEnabled = false;

  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      emailerror: false,
      pwerror: false
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
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          )
        ) {
          console.log("Invalid Email");
          this.state.emailerror = true;
        } else {
          this.state.emailerror = false;
        }
        break;
      case "password2":
        if (this.state.password !== event.target.value) {
          console.log("passwords not matched!");
          console.log(
            `pw = ${this.state.password} pw2 = ${event.target.value}`
          );
          this.state.pwerror = true;
        } else {
          this.state.pwerror = false;
        }
        break;
      default:
        break;
    }
    if (
      this.state.name !== "" &&
      this.state.password2 !== "" &&
      this.state.email !== "" &&
      !this.state.emailerror &&
      !this.state.pwerror
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
      email: this.state.email,
      password: this.state.password
    };
    register(user).then(res => {
      this.props.history.push("/users/login");
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div>
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
                className={`errorMessage ${
                  !this.state.emailerror ? "hidden" : ""
                }`}
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
                className={`errorMessage ${
                  !this.state.pwerror ? "hidden" : ""
                }`}
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
