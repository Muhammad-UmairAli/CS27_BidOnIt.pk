const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Catagory, validate } = require('../models/catagory');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Function to get all categories
router.get('/', async (req, res) => {
  const catagories = await Catagory.find()
    .select('-__v')
    .sort('name');
  res.send(catagories);
});

//Function to add new category
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let catagory = new Catagory({ name: req.body.name });
  catagory = await catagory.save();

  res.send(catagory);
});

//Function to update existing category
router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const catagory = await Catagory.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!catagory)
    return res
      .status(404)
      .send('The Catagory with the given ID was not found.');

  res.send(catagory);
});

//Function to delete category
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const catagory = await Catagory.findByIdAndRemove(req.params.id);

  if (!catagory)
    return res
      .status(404)
      .send('The Catagory with the given ID was not found.');

  res.send(catagory);
});

//Function to get category by id
router.get('/:id', validateObjectId, async (req, res) => {
  const catagory = await Catagory.findById(req.params.id).select('-__v');

  if (!catagory)
    return res
      .status(404)
      .send('The Catagory with the given ID was not found.');

  res.send(catagory);
});

module.exports = router;
