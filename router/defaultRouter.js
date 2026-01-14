// Controller
const defaultController = require('../controller/defaultController');

// Router Setup
const express = require('express');
const router = express.Router();

// Routes
router.get('/', defaultController.index);

// Export Router
module.exports = router;