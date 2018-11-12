const Employee = require('../models/employee');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const employees = await Employee.find();
    res.send(employees);
});


module.exports = router;