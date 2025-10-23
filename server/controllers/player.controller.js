const Player = require("../models/player.model");

const addPlayerData = async (req, res) => {
  try {
    const player = req.body;

    if (!player) return res.status(400).json({ message: "Incorrect Details" });

    const newPlayer = new Player(player);

    await newPlayer.save();

    res.status(201).json({ message: "Data Saved" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getPlayersData = async (req, res) => {
  try {
    const { gid } = req.body;

    if (!gid) return res.status(400).json({ message: "Missing game ID" });

    const playersData = await Player.find({ gid: gid });
    res.status(200).json(playersData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { addPlayerData, getPlayersData };
