const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  type: {
    type: String,
    required: true
  },
  isAdmin: Boolean,
  status: {
    type: Number,
    required: false,
    minlength: 5,
  },
  billing_address: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 1024
  },
  designation: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  number: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  userImage: {
    type: String,
    minlength: 2,
    maxlength: 500
  },
  stripe_cus_id : {
    type: String
  },
  packages: {
    type: Array
  },
  paymentMethods: {
    type: Array
  },
  rateCount: {
    type: Number,
    required: false,
    minlength: 0,
  },
  rating: {
    type: Number,
    required: false,
    minlength: 0,
  },
  platform : {
    type: String
  },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      type: this.type,
      userImage : this.userImage,
      paymentMethods: this.paymentMethods
    },
    config.get('jwtPrivateKey')
  );
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    type: Joi.string()
      .min(5)
      .max(255)
      .required(),
    platform: Joi.string()
      .min(5)
      .max(255)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
