const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const _ = require('lodash');


router.post('/', async(req, res) => {
    // validate the body with the schema using JOI
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // validate unique email
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('The user already exist');

    // create new User 
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;