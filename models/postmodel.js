const mongoose = require('mongoose');
//const User = require("../models/userModel");
const { User } = require('../models/userModel').schema;
var Schema = mongoose.Schema;

var PostModelSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    date: {
        type: Date,
        default: Date(Date.now())
    }
});
// Compile model from schema
var postModel = mongoose.model('Post', PostModelSchema );
module.exports = postModel;