var express = require("express");
var cors = require("cors");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");

// Express Validator
var expressValidator = require("express-validator");

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
    // cookie: { secure: true }
  })
);

var port = process.env.PORT || 5000;

app.use(cookieParser());

app.use(bodyParser());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Express Validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// const mongoURI = "mongodb://localhost/fancyapp";

// mongoose
//   .connect(
//     mongoURI,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

var Users = require("./routes/Users");

app.use("/users", Users);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

module.exports = app;
