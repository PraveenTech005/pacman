const express = require("express");
const cors = require("cors");
const Gamerouter = require("./routes/game.route");
const Playerrouter = require("./routes/player.route");
const connectDB = require("./configs/DB");
require("dotenv").config();
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api", Gamerouter);
app.use("/api/player", Playerrouter);
app.use("/api/isValidPass", async (req, res) => {
  try {
    const { pass, hashedPass } = req.body;
    const isValidPass = await bcrypt.compare(pass, hashedPass);
    return res.status(200).json({ isValid: isValidPass });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Couldn't Check the Pass", error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
