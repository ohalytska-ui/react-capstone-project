import express from 'express';
// import our controllers
import usersController from '../controllers/usersController.js';

// recordRoutes is an instance of the express router
// use it to define our routes
// the router will be added as a middleware and will take control of requests starting with a specific path
const usersRoutes = express.Router();

/// USERS ROUTES ///

// add new user account
usersRoutes.post('/api/signup', usersController.createNewUserAccount);

// check if user exist in db
usersRoutes.get('/api/login/:username/:password', usersController.logInToUserAccount);

export default usersRoutes;
