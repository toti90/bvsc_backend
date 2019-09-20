const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Appointment = require('../models/appointment');

router.get('/:time', (req, res) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    const startTime = new Date(req.params.time);
    const finishTime = new Date(startTime);
    finishTime.setHours(startTime.getHours() + 1);
    Appointment.aggregate([
      { $match: { from: new Date(startTime)} },
      { $unwind: '$table' },
      {
        $group: {
          _id: "$bigHall",
          tables: { $push: "$table"},
          numberOfBookedTables: {$sum: 1}
        }
      },
      { $project: {
        _id: 0,
        "isBigHall": "$_id",
        "tables": 1,
        "numberOfBookedTables": 1
      }}
    ])
      .then(appointment => res.status(200).json({
        appointment
      }))
      .catch(err => res.send(err));
  } else {
    res.status(415).json({
      message: 'Bad request header settings.'
    });
  }
});

module.exports = router;