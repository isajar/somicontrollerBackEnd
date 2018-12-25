const { Employee, validateCreation, validateEdition } = require('../models/employee');
const express = require('express');
const router = express.Router();
const { mongoValidId } = require('../shared/utils');

router.get('/', async(req, res) => {

    const employees = await Employee.find();

    res.send(employees);
});

router.get('/id/:id', async(req, res) => {

    if (!mongoValidId(req.params.id)) return res.status(400).send('Invalid employee id');
    const employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).send('The employee with the given id was not found.');

    res.send(employee);
});

router.get('/dni/:dni', async(req, res) => {

    const employee = await Employee.findOne({ dni: req.params.dni });
    if (!employee) return res.status(404).send('The employee with the given dni was not found.');

    res.send(employee);
});

router.post('/', async(req, res) => {

    const { error } = validateCreation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let employee = await Employee.findOne({ dni: req.body.dni });
    if (employee) return res.status(409).send('The employee with the given dni already exist')


    employee = new Employee({
        name: req.body.name,
        dni: req.body.dni
    });

    employee = await employee.save();

    res.send(employee);
});

router.put('/:id', async(req, res) => {

    if (!mongoValidId(req.params.id)) return res.status(400).send('Invalid employee id');

    const { error } = validateEdition(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employee = await Employee.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        dni: req.body.dni
    }, { new: true });

    if (!employee) return res.status(404).send('The employee with the given id was not found.');

    res.send(employee);
});

router.delete('/:id', async(req, res) => {

    if (!mongoValidId(req.params.id)) return res.status(400).send('Invalid employee id');

    const employee = await Employee.findOneAndDelete({ _id: req.params.id });
    if (!employee) return res.status(404).send('The employee with the given id was not found.');

    res.send(employee);



});




module.exports = router;