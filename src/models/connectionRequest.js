const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignore","accepted","rejected","interested"],
            message: `{value} is incorrect status type `
        }
    },
},
    {
        timeStamps: true
    },

);


const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;