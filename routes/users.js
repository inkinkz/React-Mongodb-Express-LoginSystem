const express = require("express");
const users = express.Router();
const bcrypt = require("bcrypt");

//Passport
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

//Register new user
users.post("/register", (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  //If email is not already in database, create new user
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newUser.password = hash;
          User.create(newUser)
            .then(user => {
              res.json({ status: user.email + " registered!" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

// Login
users.post("/login", passport.authenticate("local"), function(req, res) {
  // console.log("done called");
  res.send(req.user);
});

passport.serializeUser(function(user, done) {
  console.log("*** SerializeUser called, user: ");
  console.log(user);
  console.log("---------");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("DeserializeUser called");
  User.getUserById(id, function(err, user) {
    console.log("*** Deserialize user, user:");
    console.log(user);
    console.log("--------------");
    done(err, user);
  });
});

// Authenticate the user
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function(email, password, done) {
      User.getUserByEmail(email, function(err, user) {
        if (err) throw err;
        if (!user) {
          // console.log("unknown user");
          return done(null, false);
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
          if (err) return done(err);
          if (isMatch) {
            return done(null, user);
          } else {
            // console.log("incorrect password");
            return done(null, false);
          }
        });
      });
    }
  )
);

users.post("/member", function(req, res) {
  console.log(req.body.type);
  if (req.body.type === "delete") {
    console.log("delete called");
    User.deleteAccount(req.user); // Delete account from database using its id
    req.logout();
    res.send("deleted");
  } else if (req.body.type === "changePassword") {
    console.log("CHANGE PASSWORD");
    var currentPassword = req.body.currentPassword;
    var newPassword = req.body.password;

    User.comparePassword(currentPassword, req.user.password, function(
      err,
      isMatch
    ) {
      if (err) throw err;

      // Current password matched
      if (isMatch) {
        User.changePassword(req.user, newPassword, function(err) {
          if (err) throw err;
        });
        res.send("password changed");

        // Current password incorrect
      } else {
        res.send("current password not matched");
      }
    });
  }
});

module.exports = users;
