// Controller
const quotesController = require('../controller/quotesController');
const authMiddleware = require('../middleware/auth');

// Router Setup
const express = require('express');
const router = express.Router();

// Routes
router.get('/lagresitater', authMiddleware.redirectIfLoggedOut, quotesController.visLagresitaterSide);
router.post('/lagresitater', authMiddleware.redirectIfLoggedOut, quotesController.handleLagresitater);

// Export Router
module.exports = router;