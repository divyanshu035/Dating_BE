const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        // validate(value){
        //     if(validator.isEmail(value)){
        //         throw new Error("Invalid Email Address" + value);
        //     }
        // }
    },
    password: {
        type: String,
        required: true,

    },
    age: {
        type: Number,
        min: 18,
        max: 48
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
        default: "This is a default description of the user"
    },
    skills: {
        type: [String]          //array of strings can also be passed as data type
    }
},{
    timestamps: true,
})

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({ _id: user._id}, "Dev@92058", {expiresIn: "7D"});
    console.log(`2`, token)
    return token;
}


const User = mongoose.model("User", userSchema);
module.exports = User;