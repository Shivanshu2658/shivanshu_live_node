const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    gender : {
        type : String
    },
    jobTitle: {
        type: String
    }
});

const User = mongoose.model ("users",userSchema);

module.exports = User;


