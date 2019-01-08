var express = require("express")
var bcryptjs = require("bcryptjs")
var bodyParser = require("body-parser")
var app = express()
var mongoose = require("mongoose")
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Session
var session = require('express-session');

// Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Express Validator
var expressValidator = require('express-validator');

var flash = require('connect-flash');

var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
const mongoURI = 'mongodb://localhost:27017/fancyapp'

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

// express-messages   copied from github
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Handle Sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(port, () => {
  console.log("Server is running on port: " + port)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;