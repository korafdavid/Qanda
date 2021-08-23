const mongoose = require('mongoose');
const User = require("../models/userModel");
var Schema = mongoose.Schema;

var PostModelSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: User,
        required: true
    },
    date: Date.now
});
// Compile model from schema
var postModel = mongoose.model('Post', PostModelSchema );
module.exports = postModel;