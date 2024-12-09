const express = require('express');
const { user } = require('../controllers/userController');

const router = express.Router();

// Define the /place-bet route
router.post('/user', user);

module.exports = router;