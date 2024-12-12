// backend/routes/betRoutes.js
const express = require('express');
const { placeBet } = require('../controllers/betController');
const {fetchBets} = require('../controllers/fetchBets');

const router = express.Router();

router.post('/place-bet', placeBet);
router.get('/fetch-bets', fetchBets);

module.exports = router;
