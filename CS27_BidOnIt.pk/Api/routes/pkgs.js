const { Packages } = require('../models/pkgs');
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


router.get('/', async (req, res) => {
  const packages = await Packages.find()
    .select('-__v')
    .sort('title');
  res.send(packages);
});

router.post('/', [auth], async (req, res) => {
  //console.log(req.body);
  const packages = new Packages({
    bids: req.body.bids,
    price: req.body.price,
  });
  await packages.save();

  res.send(packages);
});

router.put('/:id', [auth], async (req, res) => {
  ////console.log(req.body, req.files);return false;
  //res.send(product);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const packages = await Packages.findByIdAndRemove(req.params.id);

  if (!packages)
    return res.status(404).send('The packages with the given ID was not found.');

  res.send(packages);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const packages = await Packages.findById(req.params.id).select('-__v');

  if (!packages)
    return res.status(404).send('The packages with the given ID was not found.');

  res.send(packages);
});

router.post('/purchseByUser', async (req, res) => {
  //console.log(req.body);
  var paymentMethodId = '';
  if(req.body.type == 'new'){
     paymentMethodId   = req.body.payment_method.id;
  }else{
     paymentMethodId   = req.body.payment_method;
  }

    

    if(req.body.user_id != undefined){
      return User.find({
        _id: ObjectId(req.body.user_id)
      })
      .then((user) => {
        let userObject = user[0];
          if(!userObject.stripe_cus_id){
            // If Stripe Customer is not Created
            stripe.customers.create({
              email: userObject.email,
              payment_method: paymentMethodId,
              description: 'Buyer',
              invoice_settings: {
                default_payment_method: paymentMethodId,
              },
            })
            .then((customer) => {
              var query  = { _id: userObject._id };
              var values = { $set: { stripe_cus_id: customer.id } };
              User.updateOne(query, values)
              .then((us) => {
                var makePay = makePaymentStripe(userObject,customer.id,req.body);
                //console.log(makePay);
                res.json({status : 'success', msg : 'Payment Done'});
              })
              
            })
            .catch((customerError)=>{
              res.send({
                  "error" : customerError,
              })
            })
          }else{
            if(userObject.packages[0].pkgId !== req.body.pkgId || userObject.packages[0].bids == 0){
              stripe.paymentMethods.attach(
                paymentMethodId,
                {customer: userObject.stripe_cus_id},
                function(err, paymentMethod) {
                  // asynchronously called
                  if(paymentMethod){
                    makePaymentStripe(userObject,userObject.stripe_cus_id,req.body);
                    res.json({status : 'success', msg : 'Payment Done'});
                  }else{
                    res.json({status : 'error', msg : 'Something Went Wrong'});  
                  }
                }
              );
              
            }else{
              res.send({status : 'error', msg : 'Package Already Selected.'});
            }
            
          }   
      })
    }
});

function makePaymentStripe(user,customer_id, req_data){
  var amount = req_data.price * 100;
  var paymentMethodId = '';
  if(req_data.type == 'new'){
     paymentMethodId   = req_data.payment_method.id;
  }else{
     paymentMethodId   = req_data.payment_method;
  }

  stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
    payment_method:paymentMethodId,
    description: 'Payment For Bid Pack',
    customer : customer_id,
    confirm : true,
    setup_future_usage : 'on_session'
  })
  .then((payment) => {
      //console.log('payment Done', payment); 
      packageDetail = {
        pkgId: req_data.pkgId,
        bids : req_data.bids,
        price : req_data.price,
        status: 'active'
      };
      var paymentMethodsArray = user.paymentMethods;
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
      
      var query = { _id: user._id };
      var values = { $set: {
          packages : packageDetail,
          paymentMethods : paymentMethodsArray
        } 
      };
      User.updateOne(query, values)
      .then((upus) => {
        //console.log('User updated');
        return {
          status : 'success', msg : 'Payment Done'
        }
      })
  })
  .catch((paymentError)=>{
    return {
      status : 'error', msg : paymentError
    }
  })
}


module.exports = router;
