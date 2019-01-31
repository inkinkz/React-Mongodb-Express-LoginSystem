import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  failed = false;
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("login", {
        email: user.email,
        password: user.password
      })
      .then(res => {
        if (!(res.data.error === "incorrect")) {
          localStorage.setItem("usertoken", res.data);
          this.props.history.push("/users/member");
          console.log("logged in");
          // return res.data;
        } else {
          console.log(res.data.error);
          this.failed = true;
          this.props.history.push("/users/login");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="container">
          <p className={`errorMessage ${!this.failed ? "hidden" : ""}`}>
            Incorrect email or password!
          </p>
          <h1 className="font-mukta">Login</h1>
          <p className="font-mukta">Enter your Email and Password</p>
          <label htmlFor="email">
            <b className="font-mukta">Email</b>
            <br />
          </label>
          <input
            className="font-mukta"
            type="text"
            placeholder="Enter your Email"
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
            placeholder="Enter your Password"
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
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
