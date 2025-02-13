const express = require("express");
const { fetchLiveGames } = require("../controllers/liveBetsController.js");

const router = express.Router();

router.get("/games", fetchLiveGames);

module.exports = router;
