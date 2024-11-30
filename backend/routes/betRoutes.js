// backend/routes/betRoutes.js
const express = require('express');
const { placeBet } = require('../controllers/betController');

const router = express.Router();

// Define the /place-bet route
router.post('/place-bet', placeBet);

module.exports = router;
