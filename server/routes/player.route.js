const express = require("express");
const {
  addPlayerData,
  getPlayersData,
} = require("../controllers/player.controller");
const router = express.Router();

router.post("/add", addPlayerData);
router.post("/get", getPlayersData);

module.exports = router;
