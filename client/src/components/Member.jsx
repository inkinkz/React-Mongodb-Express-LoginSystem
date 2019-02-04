import React, { Component } from "react";
import axios from "axios";

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
      password2: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("name") === null) {
      this.props.history.push("/users/login");
    } else {
      this.setState({
        name: sessionStorage.getItem("name"),
        email: sessionStorage.getItem("email")
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
        console.log(`pw = ${this.state.password} pw2 = ${event.target.value}`);
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
    console.log("onPasswordChange called");
    axios
      .post("member", {
        user: sessionStorage.getItem("user"),
        currentPassword: this.state.currentPassword,
        password: this.state.password,
        type: "changePassword"
      })
      .then(res => {
        console.log(res);
        if (res.data === "password changed") {
          this.isChanged = true;
          this.notMatched = false;
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
        user: sessionStorage.getItem("user"),
        type: "delete"
      })
      .then(res => {
        console.log(res);
        if (res.data === "deleted") {
          alert("Account Deleted Successfully!");
          this.props.history.push("/users/member");

          sessionStorage.clear();
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onPasswordChange}>
          <div className="container">
            <h1 className="font-mukta">{`Hi, ${this.state.name}`}</h1>
            <h3 className="font-mukta">{`Email: ${this.state.email}`}</h3>
            <p
              id="isChanged"
              className={`errorMessage ${!this.isChanged ? "hidden" : ""}`}
            >
              Password changed successfully!!
            </p>
            <p
              id="notMatched"
              className={`errorMessage ${!this.notMatched ? "hidden" : ""}`}
            >
              Incorrect current password!!
            </p>
            <h1 className="font-mukta">Change Password</h1>
            <p className="font-mukta">Enter your new password below.</p>
            <label htmlFor="currentPassword">
              <b className="font-mukta">Current Password</b>
              <br />
            </label>
            <input
              className="font-mukta"
              type="password"
              placeholder="Enter Current Password"
              name="currentPassword"
              onChange={this.onChange}
            />
            <br />
            <label htmlFor="password">
              <b className="font-mukta">New Password</b>
              <br />
            </label>
            <input
              className="font-mukta"
              type="password"
              placeholder="Enter New Password"
              name="password"
              onChange={this.onChange}
            />
            <br />
            <label htmlFor="password2">
              <b className="font-mukta">Confirm new password</b>
              <br />
            </label>
            <p
              id="pwError"
              className={`errorMessage ${!this.isMatch ? "hidden" : ""}`}
            >
              Passwords do not match.
            </p>
            <input
              className="font-mukta"
              type="password"
              placeholder="Enter your new password again"
              name="password2"
              onChange={this.onChange}
            />
            <button
              className="font-mukta registerbtn"
              type="submit"
              name="changePw"
              disabled={!this.isEnabled}
            >
              Register
            </button>
            <br />
            <br />
            <hr />
          </div>
        </form>
        <form onSubmit={this.onDelete}>
          <div className="container">
            <h1 className="font-mukta">Delete Account</h1>
            <p className="font-mukta">
              Once account is deleted, it cannot be undone.
            </p>
            <button
              className="font-mukta registerbtn"
              type="submit"
              name="deleteAcc"
            >
              DELETE ACCOUNT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Member;
