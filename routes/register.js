'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.post('/', (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).json({
      'message': 'Content-type is not specified.'
    });
  } else if (!req.body.email || !req.body.password) {
    let missingProperty = '';
    if (!req.body.email && !req.body.password) {
      missingProperty = 'email and password';
    } else if (!req.body.email) {
      missingProperty = 'email';
    } else {
      missingProperty = 'password';
    }
    res.status(400).json({
      'message': `Missing ${missingProperty}`
    });
  } else {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          return res.status(400).json({
            'message': 'Email is already in use.'
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500).send('Something went wrong, please try again later.');
            } else {
              const user = new User({
                email: req.body.email,
                password: hash
              });
              user.save()
                .then(result => {
                  res.status(200).json({_id: result._id, email: result.email})
                });
            }
          });
        }
      })
      .catch(() => res.status(500).send('Something went wrong, please try again later.'));
  }
});

module.exports = router;
