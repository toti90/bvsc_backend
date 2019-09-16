'use strict';

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const appointmentsRoutes = require('./routes/appointments');
const dateRoutes = require('./routes/date');
const startTimeRoutes = require('./routes/startTime');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

mongoose.connect(`mongodb+srv://Tomi:${process.env.MONGO_PASS}@bvsc-rax5n.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connection established to DB');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

app.use(express.json());

// ROUTES
app.use('/appointments', appointmentsRoutes);
app.use('/date', dateRoutes);
app.use('/starttime', startTimeRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
