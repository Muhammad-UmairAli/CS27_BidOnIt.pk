const Joi = require('joi');
const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;
const Messages = mongoose.model(
  'Messages',
  new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
  })
);

exports.Messages = Messages;
