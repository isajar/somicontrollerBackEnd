const mongoose = require('mongoose');
const employeeRouter = require('./routes/employees');
const stampsRouter = require('./routes/stamps');
const express = require('express');
const app = express();

// CONECTION TO MONGODB

mongoose.connect('mongodb://localhost/somicontroller', { useNewUrlParser: true })
    .then(() => console.log('DB...OK: Conected to Mongo DB'))
    .catch(error => console.error('DB...ERROR:Could not conect to MongoDb', error));

// MIDDLEWARE

app.use(express.json());

// ROUTE HANDLING 

app.use('/api/employees', employeeRouter);
app.use('/api/stamps', stampsRouter);

// SERVER INITIALIZATION

// global definiton of port to listen, default 3000
const port = process.env.port || 3000;
// start listening 
app.listen(port, () => console.log(`SERVER...OK: Listening on port ${port}`));