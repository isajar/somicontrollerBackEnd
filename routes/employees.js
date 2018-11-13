const { Employee, validate } = require('../models/employee');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { mongoValidId } = require('../shared/utils');

router.get('/', async(req, res) => {
    const employees = await Employee.find();

    res.send(employees);
});

router.get('/:id', async(req, res) => {
    if (!mongoValidId(req.params.id)) return res.status(400).send('Invalid employee id');
    const employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).send('The employee with the given id was not found.');

    res.send(employee);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let employee = await new Employee({
        name: req.body.name,
        dni: req.body.dni
    });

    employee = await employee.save();

    res.send(employee);
});

router.put('/:id', async(req, res) => {
    if (!mongoValidId(req.params.id)) return res.status(400).send('Invalid employee id');

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employee = await Employee.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        dni: req.body.dni
    }, { new: true });

    if (!employee) return res.status(404).send('The employee with the given id was not found.');

    res.send(employee);
});




module.exports = router;