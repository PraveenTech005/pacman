const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true
  },
  wave: {
    type: Number,
    required: true,
  },
  waveText: {
    type: [String],
    required: true,
  },
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
