'use strict';

const hooks = require('./hooks');
const request = require('request-promise');

module.exports = function(){
  const app = this;

  let url = app.get('apiUrl');

  const makeRequest = request.defaults({
    baseUrl: url,
    json: true
  });

  class Service {
    constructor(options) {
      this.options = options || {};
    }

    find(params) {
      return makeRequest(`/`);
    }

     get(id, params) {
      return makeRequest(`/${id}`);
    }

     create(data, params) {
      return makeRequest({
        uri: `/`,
        method: 'POST',
        body: data
      });
    }

    update(id, data, params) {
      // PATCH and update work the same here
      return this.update(id, data, params);
    }

    patch(id, data, params) {
      return makeRequest({
        uri: `/${id}`,
        method: 'PATCH',
        body: data
      });
    }

    remove(id, params) {
      // Retrieve the original Todo first so we can return it
      // The API only sends an empty body
      return this.get(id, params).then(todo => makeRequest({
        method: 'DELETE',
        uri: `/${id}`
      }).then(() => todo));
    }
  }

  // Initialize our service with any options it requires
  app.use('/todos', new Service());

  // Get our initialize service to that we can bind hooks
  const todoService = app.service('/todos');

  // Set up our before hooks
  todoService.before(hooks.before);

  // Set up our after hooks
  todoService.after(hooks.after);
};

//module.exports.Service = Service;
