const Employee = require('./employee');
const mongoose = require('mongoose');


const Stamp = mongoose.model('Stamp', new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    timeStamp: Number
}));

exports = Stamp;