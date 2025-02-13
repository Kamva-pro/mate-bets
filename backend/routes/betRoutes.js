const express = require('express');
const { placeBet } = require('../controllers/betController');
const {fetchBets} = require('../controllers/fetchBets');
const {fetchGame} = require('../controllers/fetchGame');
const {placeLiveBet} = require('../controllers/liveBetsController')

const router = express.Router();

router.post('/place-bet', placeBet);
router.get('/fetch-bets', fetchBets);
router.get('/fetch-game', fetchGame);
router.get('/live-bet', placeLiveBet);

module.exports = router;
