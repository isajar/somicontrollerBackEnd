const mongoose = require('mongoose');
const employeeRouter = require('./routes/employees');
const stampsRouter = require('./routes/stamps');
const userRouter = require('./routes/users');
const express = require('express');
const app = express();

// CONECTION TO MONGODB

mongoose.connect('mongodb://localhost/somicontroller', { useNewUrlParser: true })
    .then(() => console.log('DB...OK: Conected to Mongo DB'))
    .catch(error => console.error('DB...ERROR:Could not conect to MongoDb', error));

// MIDDLEWARE

app.use(express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    next();
});

// ROUTE HANDLING 

app.use('/api/employees', employeeRouter);
app.use('/api/stamps', stampsRouter);
app.use('/api/users', userRouter);

// SERVER INITIALIZATION

// global definiton of port to listen, default 3000
const port = process.env.port || 3000;
// start listening 
app.listen(port, () => console.log(`SERVER...OK: Listening on port ${port}`));