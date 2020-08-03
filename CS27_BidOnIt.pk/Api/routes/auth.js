const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Function to login user
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  if (user.status == 1) return res.status(400).send('You Are Blocked by Admin.');

  const token = user.generateAuthToken();
  //console.log(token);
  res.send(token);
});

router.post('/checkEmail', async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) return res.status(400).send('Sorry No Email Found.');
  res.status(200).send(user);
  // res.json{status : ''};
});
//Function to validate user
function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
