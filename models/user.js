const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    userName: {
        type: String,
        unique : true,
        required : true
    },
    connectedUser : {
        type : Array
    }
}, {
    timestamps : true
}
);

const User = mongoose.model ("users",userSchema);

module.exports = User;


