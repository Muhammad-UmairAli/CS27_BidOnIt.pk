const auth = require('../middleware/auth');
const _ = require('lodash');
const { User } = require('../models/user');
const { Product } = require('../models/product');
const { Orders } = require('../models/orders');
const { Bidings } = require('../models/bidings');
const { Messages } = require('../models/messages');
const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const stripe = require('stripe')('sk_test_7BatWRbZVTNuZlVfWSwqxW3E00qLpWfiFf');

// --- Getting Cards Count From DB for Admin Dashboard
router.get('/getDataCount/:id', async (req, res) => {
    dataCount = [];
    const sellersCount          = await User.countDocuments( { type: 'seller' } )
    const buyerCount            = await User.countDocuments( { type: 'buyer' } )
    var date = new Date();
    var timestamp = date.getTime();
    const liveAutionsCount      = await Product.countDocuments( { endTime: { $gt: timestamp },  active_status : 1} )
    const pendingAuctionsCount  = await Product.countDocuments( { active_status : 0 } )
    const finishedAuctionsCount = await Product.countDocuments( { timer: 0 } )
    const soldTransCount        = await Orders.countDocuments( {added_by : req.params.id, payment_status : 'complete'} )
    let conditionObj = { added_by : req.params.id, timer: { $gt: 0 },  active_status : 1 };
        const products = await Product.find(conditionObj)
            .select('-__v')
            .sort({ bidAmount: -1 });
            let productIds = [];
            products.forEach(element => {
          if(!(productIds. indexOf(element._id) !== -1)){
            productIds.push(element._id);
          }
        });
    const ongoingTransCount     = await Bidings.countDocuments( { product : {$in : productIds } } )
    const bidTransCount         = await User.countDocuments( { stripe_cus_id : {$exists:true} ,  type : "buyer" } )
    const msgCount              = await Messages.countDocuments();
    var data                    = new Object();
    data.sellerCount            = sellersCount;
    data.buyerCount             = buyerCount;
    data.liveAutionsCount       = liveAutionsCount;
    data.pendingAuctionsCount   = pendingAuctionsCount;
    data.finishedAuctionsCount  = finishedAuctionsCount;
    data.soldTransCount         = soldTransCount;
    data.ongoingTransCount      = ongoingTransCount;
    data.bidTransCount          = bidTransCount;
    data.messagesCount               = msgCount;
    dataCount.push(data);
    res.send(dataCount);
});

// --- Getting Cards Count From DB for Seller Dashboard
router.get('/getDataCountBySeller/:id', async (req, res) => {
    dataCount = [];
    var date = new Date();
    var timestamp = date.getTime();
    const liveAutionsCount      = await Product.countDocuments( {added_by : req.params.id, endTime: { $gt: timestamp },  active_status : 1} )
    const pendingAuctionsCount  = await Product.countDocuments( {added_by : req.params.id, active_status : 0 } )
    const finishedAuctionsCount = await Product.countDocuments( {added_by : req.params.id, timer: 0 } )
    const soldTransCount = await Orders.countDocuments( {added_by : req.params.id, payment_status : 'complete'} )
    // const ongoingTransCount = await Bidings.countDocuments( { added_by : req.params.id} )
    let conditionObj = { added_by : req.params.id, timer: { $gt: 0 },  active_status : 1 };
        const products = await Product.find(conditionObj)
            .select('-__v')
            .sort({ bidAmount: -1 });
            let productIds = [];
            products.forEach(element => {
          if(!(productIds. indexOf(element._id) !== -1)){
            productIds.push(element._id);
          }
        });
    const ongoingTransCount     = await Bidings.countDocuments( { product : {$in : productIds } } )
    var data                    = new Object();
    data.liveAutionsCount       = liveAutionsCount;
    data.pendingAuctionsCount   = pendingAuctionsCount;
    data.finishedAuctionsCount  = finishedAuctionsCount;
    data.soldTransCount         = soldTransCount;
    data.ongoingTransCount      = ongoingTransCount;
    data.bidTransCount          = 1;
    dataCount.push(data);
    res.send(dataCount);
});

// --- Getting Cards Count From DB for Buyer Dashboard
router.get('/getDataCountByBuyer/:id', async (req, res) => {
  const bids = await Bidings.find({ bidBy : req.params.id})
    .select('-__v')
    .sort({ bidAmount: -1 });
    let productIds = [];
    bids.forEach(element => {
      if(!(productIds. indexOf(element.title) !== -1)){
        productIds.push(element.title);
      }
    });
    dataCount = [];
    const liveAutionsCount      = await Product.countDocuments({ title : { $in: productIds }, timer: { $gt: 0 },  active_status : 1})
    var data                    = new Object();
    data.liveAutionsCount       = liveAutionsCount;
    dataCount.push(data);
    res.send(dataCount);
});

// --- Common Function For Deleting Payment Method from both cart and biding page of buyer dashboard
router.post('/deletePaymentMethod', async (req, res) => {
    var userId = req.body.user_id;
    var paymentId = req.body.payment_method_id;
    
    if(userId != undefined){
      return User.find({
        _id: ObjectId(req.body.user_id)
      })
      .then((user) => {
        let userObject = user[0];
        stripe.paymentMethods.detach(
          paymentId,
          function(err, paymentMethod) {
            if(err){
              res.json({status : 'error', msg : 'Error Deleting Payment Method'});
            }else{
              var userPaymentMethods           = userObject.paymentMethods;
              for (var i = 0; i < userPaymentMethods.length; i++){
                var p = userPaymentMethods[i];
                if(p.paymentMethodId == paymentId){
                  userPaymentMethods.splice(i, 1);
                }
              }
              var query  = { _id: userId };
              var values = { $set: { paymentMethods: userPaymentMethods } };
              User.updateOne(query, values)
              .then((us) => {
                res.json({status : 'success', msg : 'Payment Method Deleted'});
              })
            }
          }
        );
      })
    }
});

// --- Saving Message From Contact Us Form For ALL buyers
router.post('/saveUserMsg', async (req, res) => {
    const messages = new Messages({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });
    let msg = await messages.save();
    if(msg) return res.status(200).send('Message Sent Successfully To Admin.');
});

router.get('/getAllMsgs', async (req, res) => {
  const messages = await Messages.find()
    .select('-__v');
  res.send(messages);
})

router.delete('/deleteAllMsgs', async (req, res) => {
  const messagesDel = await Messages.deleteMany({});
  if (!messagesDel) return res.status(404).send('Something went wrong');

  res.send(messagesDel);
})

module.exports = router;