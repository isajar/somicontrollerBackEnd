const mongoose = require('mongoose');
const Joi = require('joi');


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

function validate(employee) {
    const schema = {
        name: Joi.string().min(3).max(48).required(),
        dni: Joi.string().min(3).required()
    };

    return Joi.validate(employee, schema);

}
module.exports.validate = validate;
module.exports.Employee = Employee;