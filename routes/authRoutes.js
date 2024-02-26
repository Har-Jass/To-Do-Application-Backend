// importing express package
const express = require('express');

// importing register user function from auth controller
const AuthController = require('../controllers/authController');

// creating router object using express's router function
// this router object will allow us to create routes
const router = express.Router();

// registerUser method will allow us to process the "/register" route
router.post('/register', AuthController.registerUser);

// loginUser method will allow us to process the "/login" route
// whenever a user want to login then loginUser method will be called
router.post('/login', AuthController.loginUser);

// exporting the router
module.exports = router;