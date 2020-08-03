const { Orders } = require('../models/orders');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
mongoose.set('useFindAndModify', false);
var myVar;
const stripe = require('stripe')('sk_test_7BatWRbZVTNuZlVfWSwqxW3E00qLpWfiFf');

//Function to get pending order by bidder id
router.get('/:id', async (req, res) => {
  const orders = await Orders.find({bidBy : req.params.id, payment_status : 'Pending'  })
    .select('-__v')
    .sort('title');
  res.send(orders);
});

//Function to get completed orders by bidder id
router.get('/getCompletedOrders/:id', async (req, res) => {
  const orders = await Orders.find({bidBy : req.params.id, payment_status : 'complete'  })
    .select('-__v')
    .sort('title');
  res.send(orders);
});

//Function to completed orders added by id
router.get('/getCompletedOrdersById/:id', async (req, res) => {
  const orders = await Orders.find({added_by : req.params.id, payment_status : 'complete'  })
    .select('-__v')
    .sort('title');
  res.send(orders);
});

router.put('/:id', [auth], async (req, res) => {
  ////console.log(req.body, req.files);return false;
  //res.send(product);
});

//Function to delete package order
router.delete('/:id', [auth, admin], async (req, res) => {
  const packages = await Packages.findByIdAndRemove(req.params.id);

  if (!packages)
    return res.status(404).send('The packages with the given ID was not found.');

  res.send(packages);
});

//Function to package by id
router.get('/:id', validateObjectId, async (req, res) => {
  const packages = await Packages.findById(req.params.id).select('-__v');

  if (!packages)
    return res.status(404).send('The packages with the given ID was not found.');

  res.send(packages);
});

//Function for payment using stripe
router.post('/purchseByUser', async (req, res) => {
  //console.log(req.body);
  
  
  var customer_id       = req.body.customer_id;
  var paymentMethodId = '';

  if(req.body.type == 'new'){
    paymentMethodId   = req.body.payment_method.id;
    stripe.paymentMethods.attach(
      paymentMethodId,
      {customer: customer_id},
      function(err, paymentMethod) {
        // asynchronously called
        if(paymentMethod){
          makePayment(req.body, paymentMethodId);
          res.json({status : 'success', msg : 'Payment Done'});  
        }else{
          res.json({status : 'error', msg : 'Something Went Wrong'});  
        }
      }
    );
  }else{
    paymentMethodId   = req.body.payment_method;
    makePayment(req.body, paymentMethodId);
    res.json({status : 'success', msg : 'Payment Done'});  
  }


  
});

//Function for stripe payment
function makePayment(req_data, paymentMethodId){
  var user_id           = req_data.user_id;
  var amount            = req_data.price * 100;
  var billing_address   = req_data.billing_address;
  var orders            = req_data.orders;
  var customer_id       = req_data.customer_id;

  if(req_data.user_id != undefined){
    return User.find({
      _id: ObjectId(req_data.user_id)
    })
    .then((user) => {
      let userObject = user[0];
      stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
        payment_method:paymentMethodId,
        description: 'Order Payment By Buyer',
        customer : customer_id,
        confirm : true,
        setup_future_usage : 'on_session'
      })
      .then((payment) => {
        Orders.bulkWrite(
          orders.map((order) => 
            ({
              updateOne: {
                filter: { _id: order._id },
                update: { $set: { billing_address: billing_address, payment_status: 'complete' } },
                upsert : true
              }
            })
          )
        )
        .then((us) => {
          var paymentMethodsArray = userObject.paymentMethods;
          var findMethod = paymentMethodsArray.filter(x => x['paymentMethodId'] === paymentMethodId)[0];
          //console.log(findMethod);
          if(findMethod == undefined){
            paymentMethod = {
              paymentMethodId: paymentMethodId,
              type : req_data.payment_method.type,
              brand : req_data.payment_method.card.brand,
              exp_month: req_data.payment_method.card.exp_month,
              exp_year: req_data.payment_method.card.exp_year,
              last4: req_data.payment_method.card.last4
            };
            paymentMethodsArray.push(paymentMethod);
          }
          var query  = { _id: user_id };
          var values = { $set: { 
            billing_address: billing_address,
            paymentMethods : paymentMethodsArray
          } };
          User.updateOne(query, values)
          .then((us) => {
            return {
              status : 'success', msg : 'Payment Done'
            }
            // res.json({status : 'success', msg : 'Payment Done'});  
          })
        })  
      })
    })
  } 
}

module.exports = router;
