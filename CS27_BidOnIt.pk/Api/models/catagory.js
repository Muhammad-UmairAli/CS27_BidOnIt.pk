const Joi = require('joi');
const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50
  }
});

const Catagory = mongoose.model('Catagory', catagorySchema);

function validateCatagory(catagory) {
  const schema = {
    name: Joi.string()
      .min(0)
      .max(50)
      .required()
  };

  return Joi.validate(catagory, schema);
}

exports.catagorySchema = catagorySchema;
exports.Catagory = Catagory;
exports.validate = validateCatagory;
