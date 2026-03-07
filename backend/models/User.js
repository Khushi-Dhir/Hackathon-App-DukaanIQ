const model = require('./model');
const mongoose = require('mongoose');
require('dotenv').config();
const userSchema = new mongoose.Schema({
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
})


models.export = mongoose.model('User', userSchema);
