const express = require('express');
const { user } = require('../controllers/userController');

const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/user', verifyToken, user);

module.exports = router;