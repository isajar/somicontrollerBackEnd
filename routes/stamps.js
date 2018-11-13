const express = require('express');
const router = express.Router();
const { Stamp, validate } = require('../models/stamp');
const { Employee } = require('../models/employee');
const { mongoValidId } = require('../shared/utils');


router.get('/', async(req, res) => {
    const stamps = await Stamp.find();

    res.send(stamps);
});

router.get('/:id', async(req, res) => {
    if (!mongoValidId(req.params.id)) return res.status(400).send('Invalid id');
    const stamp = await Stamp.findById(req.params.id);

    if (!stamp) return res.status(404).send('The stamp with the given id was not found.');

    res.send(stamp);
});

router.post('/', async(req, res) => {
    // check for malformed data
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check for valid id
    if (!mongoValidId(req.body.employeeId)) return res.status(400).send('Invalid employee id');

    // check for employee id existence
    const employee = await Employee.findById(req.body.employeeId);
    if (!employee) return res.status(404).send('The employee with the given id was not found.');

    // create new stamp 
    let stamp = await new Stamp({
        employee: employee._id,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        times: req.body.times
    });

    stamp = await stamp.save();

    res.send(stamp);
});


router.put('/:id', async(req, res) => {
    // check valid id
    if (!mongoValidId(req.params.id)) return res.status(400).send('Invalid id');

    // check malformed data
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check for employee id existence
    const employee = await Employee.findById(req.body.employeeId);
    if (!employee) return res.status(404).send('The employee with the given id was not found.');

    const stamp = await Stamp.findOneAndUpdate({ _id: req.params.id }, {
        employee: employee._id,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        times: req.body.times
    }, { new: true });

    if (!stamp) return res.status(404).send('The stamp with the given id was not found.');

    res.send(stamp);
});


module.exports = router;