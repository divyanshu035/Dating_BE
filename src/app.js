const express = require("express");

const app = express();

app.use("/admin", (req,res,next) => {
    console.log("Admin Authorisation");
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(isAdminAuthorised){
        next();
    }
    else {
        res.status(401).send("Unauthorised User");
    }
})
app.get("/admin/getAllData", (req,res,next)=> {
    res.send("All Data send");
})

app.get("/admin/deleteUser", (req,res,next)=> {
    res.send("delete User");
})

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
