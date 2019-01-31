import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class Member extends Component {
  constructor() {
    super();
    // this.state = {
    //   name: "",
    //   email: ""
    // };
  }

  componentDidMount() {
    if (localStorage.getItem("usertoken") === null) {
      this.props.history.push("/users/login");
    } else {
      // const token = localStorage.usertoken;
      // const decoded = jwt_decode(token);
      // this.setState({
      //   name: decoded.name,
      //   email: decoded.email
      // });
    }
  }

  render() {
    return (
      <div>
        <form method="post">
          <div className="container">
            <h1 className="font-mukta">432432432</h1>
            <p className="font-mukta">324234234234</p>
            <label htmlFor="currentPassword">
              <b className="font-mukta">3242342424</b>
              <br />
            </label>
            <input
              className="font-mukta"
              type="password"
              placeholder="343443"
              name="currentPassword"
            />
            <br />
            <label htmlFor="password">
              <b className="font-mukta">423424234</b>
              <br />
            </label>
            <input
              className="font-mukta"
              type="password"
              placeholder="#4234234234"
              name="password"
            />
            <br />
            <label htmlFor="password2">
              <b className="font-mukta">4324324324</b>
              <br />
            </label>
            <input
              className="font-mukta"
              type="password"
              placeholder="#33"
              name="password2"
            />
            <input
              className="font-mukta registerbtn"
              type="submit"
              name="changePW"
              value="#3"
            />
            <br />
            <br />
            <hr />
          </div>
        </form>
        <form method="post">
          <div className="container">
            <h1 className="font-mukta">4324324</h1>
            <p className="font-mukta">43234234</p>
            <input
              className="font-mukta registerbtn"
              type="submit"
              name="deleteAcc"
              value="#4"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Member;
