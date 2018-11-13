const { Employee } = require('./employee');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');


const Stamp = mongoose.model('Stamp', new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    times: [String]
}));


function validate(stamp) {
    const schema = {
        employeeId: Joi.objectId().required(),
        day: Joi.number().min(1).max(31),
        month: Joi.number().min(1).max(12),
        year: Joi.number().min(2018),
        times: Joi.array().items(Joi.string())
    };

    return Joi.validate(stamp, schema);
}

module.exports.Stamp = Stamp;
module.exports.validate = validate;