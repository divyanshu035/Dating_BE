const validator = require("validator");


const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName)
        throw new Error("Invalid Name");
    else if(!validator.isEmail(emailId))
        throw new Error("Invalid Email ");
    else if(!validator.isStrongPassword(password))
        throw new Error("Weak password");

};

const validateUpdateProfileData = (req) => {
    const allowedFields = ["firstName","lastName","emailId","photoUrl","gender","age","about","skills"];

    const isAllowed = Object.keys(req.body).every(field => allowedFields.includes(fields));

    return isAllowed;
}

module.exports = {validateSignUpData, validateUpdateProfileData};