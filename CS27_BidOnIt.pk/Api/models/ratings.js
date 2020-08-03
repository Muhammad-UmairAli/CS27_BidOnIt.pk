const Joi = require('joi');
const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;
const Ratings = mongoose.model(
  'ratings',
  new mongoose.Schema({
    userId: ObjectId,
    sellerId: ObjectId,
    rating: {
      type: Number,
      required: false,
      min: 0,
    }
  })
);

function validateRatings(order) {
    const schema = {
        sellerId : Joi.objectId().required(),
        userId: Joi.objectId().required(),
    };
  
    return Joi.validate(order, schema);
  }

exports.Ratings = Ratings;
exports.validateRatings = validateRatings;
