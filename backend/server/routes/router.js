const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const checkAuth = require('../middleware/check-auth');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)
route.get('/show-user', services.show_user)


// API
route.post('/api/users',checkAuth, controller.create);
route.get('/api/users', controller.find);
route.get('/api/users/:id', controller.findById);
route.put('/api/users/:id',checkAuth, controller.update);
route.delete('/api/users/:id',checkAuth, controller.delete);


module.exports = route