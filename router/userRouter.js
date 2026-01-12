// Controller
const userController = require('../controller/userController');

// Router Setup
const express = require('express');
const router = express.Router();

// Routes
router.get('/signin', userController.visSignInSide);
router.post('/signin', userController.handleSignIn);
router.get('/signup', userController.visSignUpSide);
router.post('/signup', userController.handleSignUp);

// Export Router
module.exports = router;