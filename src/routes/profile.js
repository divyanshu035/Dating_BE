const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateUpdateProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send("Reading Cookies" + user);
  } catch (err) {
    res.status(400).send(`err` + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const userId = req.body.userId;
  const body = req.body;
  try {
    if(!validateUpdateProfileData){
      throw new Error("Invalid Edit request");
    }
    console.log(`in update profile`, req.user)
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(`Data updated successfully for user`+ userId);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
