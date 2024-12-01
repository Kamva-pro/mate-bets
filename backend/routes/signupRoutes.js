const express = require('express');
const { signup } = require('../controllers/signupController');

const router = express.Router();

router.post('/sign-up', signup);

module.exports = router;
