const express = require("express");
const requestRouter = express.Router();
// const User = require("./models/user");
// const { validateSignUpData } = require("./utils/validation");
// const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async(req,res) => {
    const user = req.user;
    console.log("sending the connection request");
    res.send(user.firstName + "send the cinnection Request");
})

module.exports = requestRouter;