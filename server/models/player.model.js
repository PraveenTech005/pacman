const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  identity: {
    type: String,
    required: true,
  },
  waves: {
    type: [
      {
        wave: { type: Number, required: true },
        completed: { type: String, required: true },
        time: { type: Number, required: true },
        mistakes: { type: Number, required: true },
      },
    ],
    required: true,
  },
  gid: {
    type: String,
    required: true,
  },
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
