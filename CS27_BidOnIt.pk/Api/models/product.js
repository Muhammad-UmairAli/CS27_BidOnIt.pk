const Joi = require('joi');
const mongoose = require('mongoose');
const { catagorySchema } = require('./catagory');

ObjectId = mongoose.Schema.ObjectId;
const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    catagory: {
      type: catagorySchema,
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    timer: {
      type: Number,
      required: true,
      min: 0,
    },
    schedule: {
      type: Number,
      min: 0,
    },
    scheduleChk: {
      type: Number,
      min: 0,
    },
    endTime: {
      type: Number,
      required: true,
      min: 0,
    },
    timestamp : {
      type: Number,
      required: false,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: 'String',
      required: true,
      min: 0,
      max: 255
    },
    otherImages: {
      type: Array
    },
    bidAmount: {
      type: Number,
      required: false,
      min: 0,
    },
    bidBy: ObjectId,
    bidByName: {
      type: String,
      required: false,
      min: 0,
      max: 255
    },
    status: {
      type: String,
      required: false,
      min: 0,
      max: 255
    },
    added_by: ObjectId,
    active_status: {
      type: Number,
      required: false,
      min: 0,
      max: 255
    },
  })
);

function validateProduct(product) {
  const schema = {
    title: Joi.string()
      .min(0)
      .max(255)
      .required(),
    catagoryId: Joi.objectId().required(),
    description: Joi.string().required(),
    timer: Joi.number()
      .min(0)
      .required(),
    scheduleChk: Joi.number()
      .min(0),
    schedule: Joi.number()
      .min(0),
    price: Joi.number()
      .min(0)
      .required(),
    imageUrl: Joi.string()
      .min(0)
      .max(255)
      .required(),
    added_by: Joi.objectId(),  
    userId: Joi.objectId(),
    active_status: Joi.number()
    .min(0)
    .max(255),
    status: Joi.string()
      .min(0)
      .max(255),
      endTime: Joi.number()
      .min(0),
      timestamp : Joi.number()
      .min(0)
      
  };

  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
