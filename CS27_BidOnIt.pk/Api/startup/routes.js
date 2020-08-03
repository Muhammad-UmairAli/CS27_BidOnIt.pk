const express = require('express');
const catagories = require('../routes/catagories');
const products = require('../routes/products');
const users = require('../routes/users');
const auth = require('../routes/auth');
const common = require('../routes/common');
const pkgs = require('../routes/pkgs');
const orders = require('../routes/orders');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/catagories', catagories);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/products', products);
  app.use('/api/common', common);
  app.use('/api/pkgs', pkgs);
  app.use('/api/orders', orders);
};
