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

// var port = process.env.PORT || 5000;
var port = 5000;

app.listen(port, () => {
  //Check if running properly
  console.log("Server is running on port: " + port);
});

module.exports = app;
