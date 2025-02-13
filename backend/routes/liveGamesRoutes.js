import express from "express";
import { fetchLiveGames } from "../controllers/gameController.js";

const router = express.Router();

router.get("/games", fetchLiveGames);

export default router;
