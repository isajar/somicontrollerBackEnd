const { Employee } = require('./employee');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');


const Stamp = mongoose.model('Stamp', new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    month: {
        type: Number,
        required: true
    },
    time: Date
}));


function validate(stamp) {
    const schema = {
        employeeId: Joi.objectId().required(),
        month: Joi.number().min(1).max(12),
        time: Joi.date()
    };

    return Joi.validate(stamp, schema);
}

module.exports.Stamp = Stamp;
module.exports.validate = validate;