const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// Connect to database
mongoose.connect("mongodb://localhost/fancyapp", { useNewUrlParser: true });

var db = mongoose.connection;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = function(email, callback) {
  var query = { email: email };
  User.findOne(query, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  // Load hash from password DB.
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    callback(null, isMatch);
  });
};

module.exports.changePassword = function(user, newPassword, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    // Generate new hased password
    bcrypt.hash(newPassword, salt, function(err, hash) {
      user.password = hash;
      user.save(callback);
    });
  });
};

module.exports.deleteAccount = function(user) {
  var query = { _id: user._id };
  db.collection("users").deleteOne(query, function(err, obj) {
    if (err) throw err;
    console.log("Account Deleted!");
  });
};
