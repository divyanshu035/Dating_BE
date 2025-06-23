const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://divyanshushrivastav7:XCHMOgIXT9spLkAg@node.kul8egs.mongodb.net/datingApp");
    }
    catch(err){
        console.log("Database error", err)
    }
};

module.exports = connectDB;




