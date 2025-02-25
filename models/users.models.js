const { string } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles.js');

const userShema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, 'Must Be Valid Email Address']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.USER],
        default: userRoles.USER
    },
    avatar: {
        type: String,
        default: 'uploads/profile.jpg'
    }

});


module.exports = mongoose.model('User', userShema);