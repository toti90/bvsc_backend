const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// const Mobiles = require('../models/mobiles');

router.get('/sidebar', (req, res) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      Mobiles.find()
        .then(mobiles => {
          res.status(200).json(mobiles);
        })
        .catch(error => {
          res.status(500).json({
            message: 'Something went wrong, please try again later.'
          });
        });
  } else {
    res.status(415).json({
      message: 'Bad request header settings.'
    });
  }
});

router.get('/:key', (req, res) => {

  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    if (req.params.key !== 'undefined') {
      Details.find({key : new RegExp(`^${req.params.key}`)})
      .then(mobiles => {
        res.status(200).json(mobiles);
      })
      .catch(error => {
        res.status(500).json({
          message: 'Something went wrong, please try again later.'
        });
      });
    } else {
      Details.find()
        .then(mobiles => {
          res.status(200).json(mobiles);
        })
        .catch(error => {
          res.status(500).json({
            message: 'Something went wrong, please try again later.'
          });
        });
    }

  } else {
    res.status(415).json({
      message: 'Bad request header settings.'
    });
  }
});
module.exports = router;
