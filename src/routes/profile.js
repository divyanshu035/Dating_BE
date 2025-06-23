const express = require("express");
const profileRouter = express.Router();
// const User = require("./models/user");
// const { validateSignUpData } = require("./utils/validation");
// const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
const {userAuth} = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async(req,res) => {
    try{
    const user = req.user;
    res.send("Reading Cookies"+user);
    }
    catch(err){
      res.status(400).send(`err`+ err.message);
    
    }
  });

  module.exports = profileRouter;