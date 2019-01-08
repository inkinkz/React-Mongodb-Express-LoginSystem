var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Connect to database
// mongoose.connect('mongodb://localhost:27071/fancyapp');

// var db = mongoose.connection;


//User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String
    },
    email: {
        type: String,
        index: true
    },
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function (email, callback) {
    var query = {
        email: email
    };
    User.findOne(query, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    // Load hash from password DB.
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.changePassword = function (user, newPassword, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        // Generate new hased password
        bcrypt.hash(newPassword, salt, function (err, hash) {
            user.password = hash;
            user.save(callback);
        });
    });
}

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        // hash the password
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.deleteAccount = function (user) {
    var query = {
        _id: user._id
    };
    db.collection("users").deleteOne(query, function (err, obj) {
        if (err) throw err;
        console.log("Account Deleted!");
    });
}