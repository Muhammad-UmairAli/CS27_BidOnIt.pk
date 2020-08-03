const winston = require('winston');
const express = require('express');
const config = require('config');
const app = express();
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['png','PNG', 'jpg', 'JPG', 'jpeg', 'JPEG','pdf', 'PDF'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('uploads', options))
const port = process.env.PORT || config.get('port');
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
