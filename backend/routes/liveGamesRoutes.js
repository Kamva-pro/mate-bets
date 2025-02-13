const express = require("express");
const { fetchLiveGames } = require("../controllers/liveBetsController");

const router = express.Router();

router.get("/games", fetchLiveGames);

module.exports = router;
