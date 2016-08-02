'use strict';
const graphql = require('./graphql');
const todo = require('./todo');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(graphql);
  app.configure(todo);
};
