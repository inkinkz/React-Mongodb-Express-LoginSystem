var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// Session
var session = require("express-session");

//passport
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Handle Sessions
app.use(
  session({
    secret: "secretdoge",
    resave: true,
    saveUninitialized: true
  })
);

var port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

var Users = require("./routes/Users");

app.use("/users", Users);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

module.exports = app;
