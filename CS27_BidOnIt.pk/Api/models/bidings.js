const Joi = require('joi');
const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;
const Bidings = mongoose.model(
  'bidings',
  new mongoose.Schema({
    product: ObjectId,
    title: {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    added_by: ObjectId,
    bidAmount: {
      type: Number,
      required: false,
      min: 0,
    },
    bidBy: ObjectId,
    original_price :{
      type: Number,
      required: false,
    }, 
    product_image :{
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    bidByName: {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
  })
);

function validateBidings(order) {
    const schema = {
        productId : Joi.objectId().required(),
        userId: Joi.objectId().required(),
    };
  
    return Joi.validate(order, schema);
  }

exports.Bidings = Bidings;
exports.validateBidings = validateBidings;
