const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    const decoded_jwt = await jwt.verify(token, "Dev@92058");

    const { _id } = decoded_jwt;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found or cookie expired or token is invalid");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(`err`+ err.message);
  }
};

module.exports = {
  userAuth,
};
