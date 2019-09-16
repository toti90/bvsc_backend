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
    if (!req.body.username && !req.body.password) {
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
        bcrypt.compare(req.body.password, user.password, (err, resultOfPassCheck) => {

          //Error in the check password
          if (err) {
            return res.status(401).json({
              'message': 'Wrong email or password'
            });
          }

          //Correct password
          if (resultOfPassCheck) {
            res.status(200).json({
              '_id': user._id,
              'email': user.email
            });
          }

          else {
            //Incorrect password
            return res.status(401).json({
              'message': 'Wrong email or password'

            });
          }
        });
      })
      .catch(() => {
        res.status(401).json({
          'message': 'Wrong email or password'
        });
      });
  }
});


module.exports = router;
