const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true
    }
}));


module.exports = Employee;