// backend/routes/betRoutes.js
const express = require('express');
const { signin } = require('../controllers/signinController');

const router = express.Router();

// Define the /place-bet route
router.post('/sign-in', signin);

module.exports = router;
