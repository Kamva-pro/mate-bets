const express = require('express');
const { signin } = require('../controllers/signinController');

const router = express.Router();

router.post('/sign-in', signin);

module.exports = router;
