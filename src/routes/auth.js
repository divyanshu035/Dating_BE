const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    try {
      validateSignUpData(req);
      const { firstName, lastName, emailId, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
  
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
      // const user = new User(userObj);
      await user.save();
      // console.log(user)
  
  
      res.send("Added new user" + user);
    } catch (err) {
      console.log(`err`, err);
      res.status(400).send(`err`+ err.message);
    }
  });

  authRouter.post("/login", async(req,res) => {
    try{
      const {emailId, password} = req.body;
  
      const user = await User.findOne({emailId: emailId});
      if(!user){
        throw new Error("User not present in Data base")
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
  
      if(isPasswordValid){
        const token = await User.getJWT();
        res.cookie("token", token, {expires: newDate(Date.now() + 8*3600000)});
        res.send("login successful");
      }
      else {
        throw new Error("credentials mismatch");
      }
    }
    catch(err){
      res.status(400).send(`err`+ err.message);
    }
  });


  module.exports = {
    authRouter,
  }
