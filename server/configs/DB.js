const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(console.log("DB Connected"));
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
