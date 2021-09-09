const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
      type: String,
      unique: true
    },
    following: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    },
    profilephoto: {
        type: String,
        default : null
    },
    password: {
        type: String,
        required: true
    },
    resetpassword: {
        type: String,
        expires: 3600
    },
    token: {type: String}
});
// Compile model from schema
var userModel = mongoose.model('user', UserSchema );
module.exports = userModel;