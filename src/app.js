const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const {authRouter} = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    res.send(`User with id ${userId} is deleted successfully`, user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const body = req.body;
  try {
    console.log(`in patch`, userId, body);
    const user = await User.findByIdAndUpdate(userId, body, {
      runValidators: true,
    });
    res.send(`Data updated successfully for user`, user);
  } catch (err) {
    res.status(400).send(err);
  }
});

connectDB().then(() => {
  console.log("Database connected successfully");
  app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
  });
});
