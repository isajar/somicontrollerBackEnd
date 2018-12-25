const mongoose = require('mongoose');
const Joi = require('joi');

// Model for an User

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
}));

// Validate an user

function validate(user) {

    const schema = {
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
    };

    return Joi.validate(user, schema);
}

// Export model and validation 

module.exports.User = User;
module.exports.validate = validate;