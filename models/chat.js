const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
    senderReceiver : {
        type : String,
        require: true
    },
    receiverSender : {
        type : String,
        require: true
    },
    senderId : {
        type : String,
        required: true
    },
    receiverId : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
}, {
    timestamps : true
}
);

const Chat = mongoose.model ("chats",chatSchema);

module.exports = Chat;


