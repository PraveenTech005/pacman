const express = require("express");
const { createGame, joinGame } = require("../controllers/game.contoller");
const router = express.Router();

router.post("/create", createGame);
router.post("/join", joinGame);

module.exports = router;
