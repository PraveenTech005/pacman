const bcrypt = require("bcrypt");

const hashPass = async (data) => {
  const { pass } = data;
  const hashedpass = await bcrypt.hash(pass, 10);
  data.pass = hashedpass;

  return data;
};

const isValidPass = async (data, hashedpass) => {
  const { pass } = data;
  const isValid = await bcrypt.compare(pass, hashedpass);
  return isValid;
};

module.exports = { hashPass, isValidPass };
