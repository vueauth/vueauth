'use strict';

const config = require('./config');
const controllers = require('./controllers');
const routes = require('./routes');
const middlewares = require('./middlewares');
const services = require('./services');

module.exports = {
  config,
  controllers,
  routes,
  services,
  middlewares,
};
