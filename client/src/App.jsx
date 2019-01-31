import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Member from "./components/Member";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/users/login" component={Login} />
            <Route exact path="/users/register" component={Register} />
            <Route exact path="/users/member" component={Member} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
