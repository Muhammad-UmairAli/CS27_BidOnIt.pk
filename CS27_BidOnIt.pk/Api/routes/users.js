const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const { Ratings } = require('../models/ratings');
const express = require('express');
const router = express.Router();
var multipart = require('connect-multiparty');
var userMultiPart = multipart({
  uploadDir: './uploads/users'
});

//Function to get all the users
router.get('/', async (req, res) => {
  const users = await User.find( {type: 'buyer' } )
    .select('-__v')
    //console.log(users);
  res.send(users);
});

//Function to the users with packages
router.get('/getUserPacks', async (req, res) => {
  const users = await User.find( { stripe_cus_id : {$exists:true} ,  type : "buyer" } )
    .select('-__v')
    //console.log(users);
  res.send(users);
});

//Function to get all the sellers
router.get('/sellers', async (req, res) => {
  const users = await User.find( {type: 'seller' } )
    .select('-__v')
    //console.log(users);
  res.send(users);
});

//Function to get logged in user info
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

//Function to get user by id
router.get('/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id).select('-__v');
  res.send(user);
});

//Function to register new user
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'type', 'status', 'platform']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.status = 0;
  // user.rateCount = 0;
  // user.rating = 0;
  await user.save();

  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(_.pick(user, ['_id', 'name', 'email', 'type', 'status', 'platform']));
});

//Function to update existing users
router.put('/updateUser/:id', userMultiPart, async (req, res) => {
  let form = req.body;
  //console.log(form);
  var filepath = '';
  if(req.files.file != undefined){
    var path = req.files.file.path;
    filepath = path.substr(path.indexOf("\\") + 1); //for local set indexOf parameter to \\ for live set indexOf parameter to /
    
  }else{
    filepath = req.body.userImage;
  }
  req.body.userImage = filepath;
  ////console.log(req.body);return false;
  const resp = await User.findByIdAndUpdate(
    req.params.id,
    {
      name : req.body.name,
      email : req.body.email,
      designation : req.body.designation,
      number : req.body.number,
      userImage : req.body.userImage,
    },
    {new: true}
  );
  //console.log(resp);
  const token = resp.generateAuthToken();
  res.send({resp : resp, token : token});
});

//Function to update password
router.put('/updatepassword/:id', async (req, res) => {
  let form = req.body;
  console.log(req.body);
  // let user = await User.findOne({_id : req.params.id});
  // const validPassword = await bcrypt.compare(req.body.old_password, user.password);
  // if (!validPassword) return res.send({erormsg : 'Incorrect Old Password.'});
  ////console.log(user, validPassword);return false;
  const salt = await bcrypt.genSalt(10);
  form.password = await bcrypt.hash(form.password, salt);
  const resp = await User.findByIdAndUpdate(
    req.params.id,
    { 
      password : form.password,
    },
    {new: true}
  );
  //console.log(resp);
  res.send(resp);
});

//Function to block/ unblock user by admin
router.put('/changeUserStatus/:id', async (req, res) => {
  let form = req.body;
  //console.log(form);
  ////console.log(User);return false;
  const resp = await User.findByIdAndUpdate(
    req.params.id,
    { 
      status : form.status,
    },
    {new: true}
  );
  //console.log(resp);
  res.send(resp);
});

//Function to approve product by admin added by seller
router.post('/rateSellerByBuyer', async (req, res) => {
  let form = req.body;
  // var rateOj = {       
  //    userId: form.userId,
  //    sellerId: form.sellerId,
  //    rating: form.rating, 
  // };
  const ratings = new Ratings(form);
  ratings.save();
  const resp = await User.findByIdAndUpdate(
    form.sellerId,
    {$inc : {'rateCount' : 1, 'rating' : form.rating}},
    {new: true}
  );
  //console.log(resp);
  res.send(resp);
});

//Function to get user by id
router.get('get_seller_rating/:id', auth, async (req, res) => {
  let user = await User.findById(req.params.id).select('-__v');
  var avg = 0;
  if(user.rating !== undefined && user.rateCount !== undefined){
    avg = user.rating / user.rateCount;
  }
  user.avg = avg;
  res.send(user);
});

router.post('/checkUserByEmailForSocial/',  async (req, res) => {
  const user = await User.findOne({ email: req.body.email , platform : req.body.type});
  console.log(user);
  if (!user) return res.status(400).send('Sorry No Email Found.');
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(_.pick(user, ['_id', 'name', 'email', 'type', 'status', 'platform']));
  //res.status(200).send(user);
  // var avg = 0;
  // if(user.rating !== undefined && user.rateCount !== undefined){
  //   avg = user.rating / user.rateCount;
  // }
  // user.avg = avg;
  // res.send(user);
});



module.exports = router;
