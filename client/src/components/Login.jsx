import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

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
    if (sessionStorage.getItem("name") === null) {
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
        console.log("login response: ");
        console.log("res >>>>>>" + res);
        console.log(res.data.name);
        if (res.status === 200) {
          sessionStorage.setItem("user", res.data);
          sessionStorage.setItem("name", res.data.name);
          sessionStorage.setItem("email", res.data.email);
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
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
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
}

export default Login;
