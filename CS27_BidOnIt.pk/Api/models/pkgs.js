const Joi = require('joi');
const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;
const Packages = mongoose.model(
  'packages',
  new mongoose.Schema({
    bids: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  })
);

exports.Packages = Packages;
