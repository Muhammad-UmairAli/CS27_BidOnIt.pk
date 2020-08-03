const { Product, validate } = require('../models/product');
const { User } = require('../models/user');
const { Orders, validateOrder } = require('../models/orders');
const { Bidings } = require('../models/bidings');
const { Catagory } = require('../models/catagory');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
var multipart = require('connect-multiparty');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
mongoose.set('useFindAndModify', false);
var prdouctMultiPart = multipart({
  uploadDir: './uploads/products'
});
var myVar = [];
var myApproveVar = [];
var date = new Date();
var timestamp = date.getTime();
var mytime = 15*60000;
timestamp = timestamp + mytime;
//console.log(timestamp);

//Function to get all the products
router.get('/', async (req, res) => {
  const products = await Product.find()
    .select('-__v')
    .sort('title');
  res.send(products);
});

//Function to get products added by admin
router.get('/byadmin/:id', async (req, res) => {
  const products = await Product.find({added_by : req.params.id})
    .select('-__v')
    .sort('title');
  res.send(products);
});

//Function to get products added by all sellers
router.get('/byseller/:id', async (req, res) => {
  const products = await Product.find({ added_by: { $ne : req.params.id } })
    .select('-__v')
    .sort('title');
  res.send(products);
});

//Function to get products on buy page
router.get('/prodMaxBid', async (req, res) => {
  const products = await Product.find({ timer : 0 })
  .select('-__v')
  .sort({ bidAmount: -1 })
  .limit(4);
  res.send(products);
});
router.get('/liveproducts', async (req, res) => {
  var date = new Date();
  var timestamp = date.getTime();
  const products = await Product.find({ timer: { $gt: 0 },  active_status : 1, schedule : { $lt : timestamp }})
    .select('-__v')
    .sort({ bidAmount: -1 })
    .limit(8);
  res.send(products);
});

//Function to get products for user on which user bid
router.get('/liveproductsByUser/:id', async (req, res) => {
  const bids = await Bidings.find({ bidBy : req.params.id})
    .select('-__v')
    .sort({ bidAmount: -1 });
    let productIds = [];
    bids.forEach(element => {
      if(!(productIds. indexOf(element.product) !== -1)){
        productIds.push(element.product);
      }
    });
  const products = await Product.find({ _id : { $in: productIds }, status: 'Sold', timer: { $gt: 0 },  active_status : 1})
      .select('-__v')
      .sort({ bidAmount: -1 });
  res.send(products);
});

//Function to get all finished products
router.get('/finshdproducts', async (req, res) => {
  const products = await Product.find({ timer: 0 })
    .select('-__v')
    .sort({ bidAmount: -1 })
    .limit(8);
  res.send(products);
});

//Function to get active products
router.get('/active', async (req, res) => {
  var date = new Date();
  var timestamp = date.getTime();
  const products = await Product.find({timer : {$gt : 0 }, active_status : 1, endTime : { $gt : timestamp }, schedule : { $lt : timestamp }})
    .select('-__v')
    .sort('title');
  res.send(products);
});

//Function to get products by filter on seller and admin dashboard
router.get('/getProductsByfilter/:type/:user_type/:id', async (req, res) => {
  let conditionObj = {};
  switch (req.params.type) {
    case 'live':
      if(req.params.user_type == 'admin'){
        conditionObj = { timer: { $gt: 0 },  active_status : 1};
      }else{
        conditionObj = {added_by : req.params.id, timer: { $gt: 0 },  active_status : 1};
      }
    break;
    case 'pending':
      if(req.params.user_type == 'admin'){
        conditionObj = { active_status : 0 };
      }else{
        conditionObj = {added_by : req.params.id, active_status : 0 };
      }
    break;
    case 'finished':
      if(req.params.user_type == 'admin'){
        conditionObj = { timer: 0 };
      }else{
        conditionObj = {added_by : req.params.id, timer: 0 };
      }
    break;
    case 'sold':
      conditionObj = {added_by : req.params.id, timer: 0 ,  status : 'Sold'};     
    break;
    case 'ongoing':
        //conditionObj = { added_by : req.params.id, timer: { $gt: 0 },  status : 'Sold'};
        if(req.params.user_type == 'admin'){
          conditionObj = {};          
        }else{
          conditionObj = { added_by : req.params.id };
        }
        const bidings = await Bidings.find(conditionObj)
            .select('-__v')
            .sort('title');
          res.send(bidings);
          return false;
    break;
    default:
      break;
  }
  const products = await Product.find(conditionObj)
    .select('-__v')
    .sort('title');
  res.send(products);
});

//Function to get filterd products by user
router.get('/getBiddingsByfilter/:type/:user_type/:id', async (req, res) => {
  let conditionObj = {};
  switch (req.params.type) {
    case 'ongoing':
      conditionObj = { added_by : req.params.id, timer: { $gt: 0 },  active_status : 1 };
      //}
      //console.log(conditionObj);
      // const bidings = await Bidings.find(conditionObj)
      //     .select('-__v')
      //     .sort('title');
      //   res.send(bidings);
        const products = await Product.find(conditionObj)
            .select('-__v')
            .sort({ bidAmount: -1 });
            let productIds = [];
            products.forEach(element => {
          if(!(productIds. indexOf(element._id) !== -1)){
            productIds.push(element._id);
          }
        });
        //console.log(productIds);
        var bidings = await Bidings.find({ product : {$in : productIds }})
          .select('-__v')
          .sort({ bidAmount: -1 });
          
        
    break;
    default:
      break;
  }
  res.send(bidings);
  // const bidings = await Bidings.find(conditionObj)
  // .select('-__v')
  // .sort('title');
  // res.send(bidings);
});

//Function to get seller products by id
router.get('/seller/:id', async (req, res) => {
  ////console.log(req.params.id);return false;
  const products = await Product.find({added_by : req.params.id})
    .select('-__v')
    .sort('title');
    //console.log(products);
  res.send(products);
});

//Function to add new products
router.post('/', [auth], prdouctMultiPart, async (req, res) => {
  console.log(req.body, req.files);

  var filepath = '';
  var filesArr = [];
  if(req.files.file != undefined){
    req.files.file.forEach((element, index) => {
      let path = element.path.substr(element.path.indexOf("\\") + 1);
      if(index == 0){
        filepath = path; 
        filesArr.push(path);
      }else{
        filesArr.push(path);
      }
    });
    // var path = req.files.file.path;
    // filepath = path.substr(path.indexOf("\\") + 1); //for local set indexOf parameter to \\ for live set indexOf parameter to /
  }
  delete req.body.imagePath;
  req.body.imageUrl = filepath;
  ////console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const catagory = await Catagory.findById(req.body.catagoryId);
  if (!catagory) return res.status(400).send('Invalid Catagory.');
  var bidAmount = (req.body.price/100) * 30;
  var date = new Date();
  var timestamp = date.getTime();
  var mytime = req.body.timer * 60000;
  timestamp = timestamp + mytime;
  //var endTime = 
  const product = new Product({
    title: req.body.title,
    catagory: {
      _id: catagory._id,
      name: catagory.name
    },
    description: req.body.description,
    timer: req.body.timer,
    schedule : req.body.schedule,
    scheduleChk : req.body.scheduleChk,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    otherImages : filesArr,
    status : req.body.status,
    added_by : req.body.added_by,
    bidAmount : bidAmount,
    active_status : req.body.active_status,
    endTime : timestamp,
    timestamp : timestamp
  });
  await product.save();

  if(req.body.scheduleChk == 1){
    if(myApproveVar[product._id] !== undefined){
      clearTimeout(myApproveVar[product._id]);
    }
    let now = (new Date()).getTime();
    let diff = Math.max((product.schedule - now), 0);
    myApproveVar[req.params.id] = setTimeout(() => {
      var date = new Date();
      var timestamp = date.getTime();
      var mytime = product.timer * 60000;
      timestamp = timestamp + mytime;
      const product2 = Product.findByIdAndUpdate(
        product._id,
        {
          endTime : timestamp,
          timestamp : timestamp,
          active_status : 1
        },
        {new: true},
        (err, product22) => {
          console.log(product22);
        }
      )
    }, (diff));
  }

  res.send(product);
});

//Function to edit existing product
router.put('/:id', [auth], prdouctMultiPart, async (req, res) => {
  ////console.log(req.body, req.files);return false;
  var filepath = '';
  var filesArr = [];
  if(req.files.file != undefined){
    req.files.file.forEach((element, index) => {
      let path = element.path.substr(element.path.indexOf("\\") + 1);
      if(index == 0){
        filepath = path; 
        filesArr.push(path);
      }else{
        filesArr.push(path);
      }
    });
    // var path = req.files.file.path;
    // filepath = path.substr(path.indexOf("\\") + 1); //for local set indexOf parameter to \\ for live set indexOf parameter to /
    
  }else{
    filepath = req.body.imagePath;
    filesArr = req.body.otherImagesPath;
    delete req.body.file;
  }
  delete req.body.imagePath;
  delete req.body.otherImagesPath;
  req.body.imageUrl = filepath;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const catagory = await Catagory.findById(req.body.catagoryId);
  if (!catagory) return res.status(400).send('Invalid caragory.');
  var bidAmount = (req.body.price/100) * 30;
  var date = new Date();
  var timestamp = date.getTime();
  var mytime = req.body.timer * 60000;
  timestamp = timestamp + mytime;
  //console.log(timestamp);
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      catagory: {
        _id: catagory._id,
        name: catagory.name
      },
      description: req.body.description,
      timer: req.body.timer,
      schedule : req.body.schedule,
      scheduleChk : req.body.scheduleChk,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      otherImages : filesArr == null ? [] :filesArr,
      status : req.body.status,//"Un-Sold",
      added_by : req.body.added_by,
      bidAmount : bidAmount,
      active_status : req.body.active_status,
      endTime : timestamp,
      timestamp : timestamp
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send('The product with the given ID was not found.');

    if(req.body.scheduleChk == 1){
      if(myApproveVar[product._id] !== undefined){
        clearTimeout(myApproveVar[product._id]);
      }
      let now = (new Date()).getTime();
      let diff = Math.max((product.schedule - now), 0);
      myApproveVar[req.params.id] = setTimeout(() => {
        var date = new Date();
        var timestamp = date.getTime();
        var mytime = product.timer * 60000;
        timestamp = timestamp + mytime;
        const product2 = Product.findByIdAndUpdate(
          product._id,
          {
            endTime : timestamp,
            timestamp : timestamp,
            active_status : 1
          },
          {new: true},
          (err, product22) => {
            //console.log(product22);
          }
        )
      }, (diff));
    }
  res.send(product);
});

//Function to save bid on product
router.put('/saveProductBid/:id', [auth], async (req, res) => {  
  //const { error } = validate(req.body);
  ////console.log(error)
  //if (error) return res.status(400).send(error.details[0].message);
  ////console.log('req', req.body);
  const user = await User.findById(req.body.userId).select('-__v');
  ////console.log(user);return false;
  if(user.packages === undefined){
    res.send({error : 'No Bids found. Please purchase a Package of Bids.'});
  }else{
    if(user.packages[0].bids == 0){
      
      res.send({error : 'No remaining Bids found. Your Package is expired. Please purchase a new Package of Bids.'});
    }
  } 
  user.packages[0].bids = user.packages[0].bids - 1;
  const resp = await User.findByIdAndUpdate(
    req.body.userId,
    { 
      packages : user.packages,
    },
    {new: true}
  );
  //var timestamp = date.getTime();
  var date = new Date();
  var mytime = req.body.timer * 60000;
  timestamp = date.getTime() + mytime;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      catagory: {
        _id: req.body.catagory._id,
        name: req.body.catagory.name
      },
      description: req.body.description,
      timer: req.body.timer,
      schedule : req.body.schedule,
      scheduleChk : req.body.scheduleChk,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      bidAmount : req.body.bidAmount,
      bidBy : mongoose.Types.ObjectId(req.body.userId),
      bidByName : req.body.bidByName,
      status : "Sold",
      added_by : req.body.added_by,
      active_status : req.body.active_status,
      endTime : timestamp,
      timestamp : timestamp
    },
    { new: true }
  );
  ////console.log(product);
  if (!product){
    return res.status(404).send('The product with the given ID was not found.');
  }else{

    const bidingObj = {
      product : mongoose.Types.ObjectId(req.body.productId),
      title: req.body.title,
      product_image : req.body.imageUrl,
      original_price: req.body.price,
      added_by : req.body.added_by,
      bidAmount: req.body.bidAmount,
      bidBy : mongoose.Types.ObjectId(req.body.userId),
      bidByName : req.body.bidByName,
    };

    const bidings = new Bidings(bidingObj);
    bidings.save();
    //console.log(bidings);

    const orderObj = {
      product : mongoose.Types.ObjectId(req.body.productId),
      title: req.body.title,
      product_image : req.body.imageUrl,
      original_price: req.body.price,
      added_by : req.body.added_by,
      bidAmount: req.body.bidAmount,
      bidByName : req.body.bidByName,
      bidBy : mongoose.Types.ObjectId(req.body.userId),
      payment_status : 'Pending'
    };
    if(myVar[req.params.id] !== undefined){
      clearTimeout(myVar[req.params.id]);
    }
    
    myVar[req.params.id] = setTimeout(() => {
      const product2 = Product.findByIdAndUpdate(
        req.params.id,
        {
          timer: 0,
          endTime : 0
        },
        {new: true},
        (err, product22) => {
          //console.log(product22);
        }
      )
      setTimeout(() => {
        const order = new Orders(orderObj);
        order.save();
      }, 2000);
    }, (req.body.timer * 60000));
    
  }
  let eTime = product.endTime - date.getTime();
  res.send({product :product, eTime : eTime});
});

//Function to approve product by admin added by seller
router.put('/approveProduct/:id', async (req, res) => {
  let form = req.body;
  //console.log(form);//return false;
  ////console.log(User);return false;
  var date = new Date();
  var timestamp = date.getTime();
  var mytime = req.body.timer * 60000;
  timestamp = timestamp + mytime;
  const resp = await Product.findByIdAndUpdate(
    req.params.id,
    {
      endTime : timestamp,
      timestamp : timestamp,
      active_status : req.body.active_status
    },
    {new: true}
  );
  //console.log(resp);
  res.send(resp);
});

//Function to delete product
router.delete('/:id', [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

//Function to product by id
router.get('/:id', validateObjectId, async (req, res) => {
  const product = await Product.findById(req.params.id).select('-__v');

  if (!product)
    return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

//Function to product by id
router.get('/productandseller/:id', validateObjectId, async (req, res) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id).select('-__v');
  let user = await User.findById(product.added_by).select('-__v');
  let avg = 0;
  if(user.rating !== undefined && user.rateCount !== undefined){
    avg = user.rating / user.rateCount;
  }
  // myuser.avg = avg;
  if (!product)
    return res.status(404).send('The product with the given ID was not found.');
    
    // console.log(product, user);
  res.send({product: product, user : user, avg : avg});
});

module.exports = router;
