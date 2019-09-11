const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Appointment = require('../models/appointment');

router.get('/:day', (req, res) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    const today = new Date(req.params.day);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    Appointment.aggregate([
      { $match: { from: { $gte: new Date(today), $lte: new Date(tomorrow) } } },
      { $unwind: '$table' },
      {
        $group: {
          _id: "$from",
          numberOfTablesBooked: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          "_id": 0,
          "numberOfTablesBooked": 1,
          "time": "$_id"
        }
      }
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