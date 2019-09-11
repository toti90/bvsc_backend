const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Appointment = require('../models/appointment');

router.post('/', (req, res) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    const startTime = new Date(req.body.from);
    const endTime = new Date(req.body.to);
    const isBigHall = req.body.bigHall;
    const table = req.body.table;
    if (startTime !== undefined && endTime !== undefined && isBigHall !== undefined && table !== undefined) {
      const appointment = new Appointment({ from: startTime, to: endTime, bigHall: isBigHall, table: table});
      appointment.save()
        .then(result => res.status(200).json({
          message: 'added appointment'
        }))
        .catch(err => res.send(err));
    } else {
      let missingProperty = [];
      if (startTime === undefined) {
        missingProperty.push('startTime');
      }
      if (endTime === undefined) {
        missingProperty.push('endTime');
      }
      if (isBigHall === undefined) {
        missingProperty.push('isBigHall');
      }
      if (table === undefined) {
        missingProperty.push('table');
      }
      res.status(400).json({
        'message': `Missing ${missingProperty.join(' and ')}`
      });
    }
  } else {
    res.status(415).json({
      message: 'Bad request header settings.'
    });
  }
});

module.exports = router;