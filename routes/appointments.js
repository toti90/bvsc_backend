const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const Appointment = require('../models/appointment');
const nodeMailer = require('../routes/sendEmail')

router.post('/', (req, res) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    const startTime = new Date(req.body.from);
    const endTime = new Date(req.body.to);
    const isBigHall = req.body.bigHall;
    const table = req.body.table;
    const user = req.body.user;
    if (startTime !== undefined && endTime !== undefined && isBigHall !== undefined && table !== undefined) {
      const appointment = new Appointment({ from: startTime, to: endTime, bigHall: isBigHall, table: table, user: user});
      appointment.save()
        .then(result => res.status(200).json({
          message: 'added appointment'
        }))
        .catch(err => res.send(err));

        nodeMailer(appointment, req.body.email)
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

router.get('/:id', (req, res) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    const id = req.params.id
    if (id !== undefined) {
      Appointment.find({user: new ObjectId(id)}).select('_id from to bigHall table')
        .then(result => 
          res.status(200).json(result)
        )
        .catch(err => res.send(err));
    } else {
      res.status(400).json({
        'message': `Missing id`
      });
    }
  } else {
    res.status(415).json({
      message: 'Bad request header settings.'
    });
  }
});

router.delete('/', (req, res) => {
  let id = req.query.id
  let table = req.query.table
  console.log(id)
  console.log(table)
  // if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
  //   const id = req.params.id
  //   console.log(id)
  //   if (id !== undefined) {
  //     Appointment.find({user: new ObjectId(id)}).select('_id from to bigHall table')
  //       .then(result => 
  //         res.status(200).json(result)
  //       )
  //       .catch(err => res.send(err));
  //   } else {
  //     res.status(400).json({
  //       'message': `Missing id`
  //     });
  //   }
  // } else {
  //   res.status(415).json({
  //     message: 'Bad request header settings.'
  //   });
  // }
});

module.exports = router;