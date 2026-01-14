const express = require('express');
const { placeBet } = require('../controllers/betController');
const { fetchBets } = require('../controllers/fetchBets');
const { fetchGame } = require('../controllers/fetchGame');
const { placeLiveBet } = require('../controllers/liveBets');
const { findMatch } = require('../controllers/matchmakingController');
const { deposit } = require('../controllers/paymentController');
const { verifyBetResult } = require('../controllers/resultVerificationController');

const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/place-bet', verifyToken, placeBet);
router.get('/fetch-bets', verifyToken, fetchBets);
router.get('/fetch-game', verifyToken, fetchGame);
router.post('/place-live-bet', verifyToken, placeLiveBet);
router.post('/find-match', verifyToken, findMatch);
router.post('/deposit', verifyToken, deposit);
router.post('/verify-result', verifyToken, verifyBetResult);

module.exports = router;
