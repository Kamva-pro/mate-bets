// // routes/betRoutes.js
const express = require('express');
const router = express.Router();
const { placeBetController } = require('../controllers/betController'); // Import the controller

// Define the route for placing a bet
router.post('/place-bet', placeBetController);

module.exports = router;
