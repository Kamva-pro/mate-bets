// backend/routes/betRoutes.js
const express = require('express');
const { signup } = require('../controllers/signupController');

const router = express.Router();

// Define the /place-bet route
router.post('/sign-up', signup);

module.exports = router;
