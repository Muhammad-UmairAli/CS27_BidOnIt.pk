const Joi = require('joi');
const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;
const Orders = mongoose.model(
  'orders',
  new mongoose.Schema({
    product: ObjectId,
    title: {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
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
    payment_status :{
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
    billing_address :{
      type: String,
      required: false,
      trim: true,
      minlength: 0,
    },
    added_by: ObjectId,
    bidByName: {
      type: String,
      required: false,
      trim: true,
      minlength: 0,
      maxlength: 255
    },
  })
);

function validateOrder(order) {
    const schema = {
        productId : Joi.objectId().required(),
        userId: Joi.objectId().required(),
    };
  
    return Joi.validate(order, schema);
  }

exports.Orders = Orders;
exports.validateOrder = validateOrder;
