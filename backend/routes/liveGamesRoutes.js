const express = require("express");
const { fetchLiveGames } = require("../controllers/liveGames");

const router = express.Router();

router.get("/games", fetchLiveGames);

module.exports = router;
