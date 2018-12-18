const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const Employee = mongoose.model('Employee', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    }
}));

function validateCreation(employee) {
    const schema = {
        _id: Joi.optional(),
        name: Joi.string().min(3).max(48).required(),
        dni: Joi.string().min(3).required()
    };

    return Joi.validate(employee, schema);
}

function validateEdition(employee) {
    const schema = {
        _id: Joi.objectId(),
        name: Joi.string().min(3).max(48).required(),
        dni: Joi.string().min(3).required()
    };

    return Joi.validate(employee, schema);
}

module.exports.validateCreation = validateCreation;
module.exports.validateEdition = validateEdition;
module.exports.Employee = Employee;