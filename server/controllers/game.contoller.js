const Game = require("../models/pacman.model");
const isValid = require("../helpers/dataValidator");
const { hashPass } = require("../helpers/hashPass");


const createGame = async (req, res) => {
  try {
    const data = req.body;
    if (!data)
      return res.status(500).json({ message: "Something went wrong!" });

    if (!isValid(data)) {
      return res.status(400).json({ message: "Invalid game data" });
    }

    const hashedPassData = await hashPass(data)

    const game = new Game(hashedPassData);
    await game.save();
    return res.status(201).json({ message: "Game Created" });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: "Try Different Code" });
    return res
      .status(500)
      .json({ message: "Something went Wrong! :(", error: err.message });
  }
};

const joinGame = async (req, res) => {
  try {
    const { icode } = req.body;

    if (!icode)
      return res.status(400).json({ message: "Game Code is required" });

    let gameData = await Game.findOne({ code: icode });

    if (!gameData) res.status(404).json({ message: "Game Not Found" });

    return res.status(200).json({ message: "Game Found", gameData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong", error: error.message });
  }
};

module.exports = { createGame, joinGame };
