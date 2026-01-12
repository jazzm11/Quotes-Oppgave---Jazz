// Controller
const defaultController = require('../controller/defaultController');
const authMiddleware = require('../middleware/auth');

// Router Setup
const express = require('express');
const router = express.Router();

// Routes
router.get('/', authMiddleware.redirectIfLoggedOut, defaultController.index);

// Export Router
module.exports = router;