var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.redirect('/users/login');
// });

// router.get('/login', function (req, res, next) {
//   res.render('login', {
//     title: 'Login'
//   });
// });

// router.get('/register', function (req, res, next) {
//   res.render('register', {
//     title: 'Register'
//   });
// });

// Register Button 
router.post('/register', function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Check if email is valid, passwords are matched
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    // Create new user 
    var newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    // Add new user to database
    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      //log new created user to console
      console.log(user);
    });

    req.flash('success', 'Registered successfully');

    res.redirect('/users/login');
  }
});

// Login Button
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: "Incorrect Email or Password!"
  }),
  function (req, res) {

  });

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

// Authenticate the user
passport.use(new LocalStrategy(function (email, password, done) {
  User.getUserByEmail(email, function (err, user) {
    if (err) throw err;
    if (!user) {
      console.log('unknown user');
      return done(null, false, {
        message: 'Incorrect Email!'
      });
    }
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        console.log('incorrect password');
        return done(null, false, {
          message: 'Incorrect Password!'
        });
      }
    });
  });
}));

// Logout
router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/users/login');
});

module.exports = router;