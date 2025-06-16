const express = require("express");

const app = express();

// app.use("/tesst", (req, res) => {
//     res.send("this is test");
// });

// app.use("/serve", (req, res) => {
//     res.send("this is server");
// });

app.get("/user/:userId", (req, res) => {
    console.log(req.params)
  res.send({ firstName: "Divyanshu", lastName: "Srivastava" });
});

app.post("/user", (req,res) => {
    res.send("Post call successfully completed");
})

app.use("/", (req, res) => {
  res.send("Hello from the server");
});
app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
