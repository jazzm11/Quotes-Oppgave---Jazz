// Controller
const quotesController = require('../controller/quotesController');
const authMiddleware = require('../middleware/auth');

// Router Setup
const express = require('express');
const router = express.Router();

// Routes
// Save, Edit, and Delete Quotes Routes
router.get('/lagresitater', authMiddleware.redirectIfLoggedOut, quotesController.visLagresitaterSide);
router.post('/lagresitater', authMiddleware.redirectIfLoggedOut, quotesController.handleLagresitater);
router.post('/lagresitater/endre/:id', authMiddleware.redirectIfLoggedOut, quotesController.endreSitater);
router.post('/lagresitater/slett/:id', authMiddleware.redirectIfLoggedOut, quotesController.slettSitater);

// Quotes Page Route
router.get('/quotes', quotesController.quotesSide);

// :brukernavn Quotes Page Route
router.get('/quotes/:brukernavn', quotesController.brukernavnQuotesSide);

// Export Router
module.exports = router;