const { validationResult } = require("express-validator");
const User = require("../models/user");
const Chat = require("../models/chat");
const { getIo } = require('../socket'); // Import `getIo` function

const createChatController = async (req, res) => {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Provide required fields",
                error: errors.array()
            });
        }
        const { receiverId } = req.body;
        const senderId = req.user.id;
        const users = await User.findById(req.user.id);
        users.connectedUser.push(receiverId);
        let user = await User.findByIdAndUpdate(req.user.id, { ...users }, { new: true });

        // Emit event to connected users
        const io = getIo(); // Use `getIo` to get the socket instance
        io.emit('new-chat', { senderId, receiverId });

        res.status(200).json({
            success: true,
            msg: "User added successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: err.message
        });
    }
};

const sendChatController = async (req, res) => {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: "Please provide message field",
                error: errors.array()
            });
        }

        const senderId = req.user.id;
        const { message, receiverId } = req.body;

        const sender_receiver = senderId + receiverId;
        const receiver_sender = receiverId + senderId;

        const chats = await Chat.create({
            senderReceiver: sender_receiver,
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });

        // Emit the chat message to all clients
        const io = getIo(); // Use `getIo` to get the socket instance
        io.emit('chat message', {
            senderId,
            receiverId,
            message
        });
        res.status(200).json({
            success: true,
            msg: "Message sent successfully",
            chats: chats
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: err.message
        });
    }
};



const getUserChatsController  =  async(req,res) => {
    try{
        const errors = validationResult(req.body);
        if (!errors.isEmpty) {
            return res.status(400).json({
                success: false,
                msg: "Please provide message field",
                error: errors.array()
            })
        }
        const senderId = req.user.id;

        const {receiverId} = req.body;
        const sender_receiver = senderId + receiverId;
        const receiver_sender = receiverId + senderId;

        console.log(`Sender ID: ${senderId}`);
        console.log(`Receiver ID: ${receiverId}`);


        const chats = await Chat.find({
            $or: [
                { senderReceiver: sender_receiver },
                { senderReceiver: receiver_sender }
            ]
        });

        console.log(`Chats: ${chats}`);

        res.status(200).json({
            success: true,
            msg: "Chats fetched successfully",
            chats: chats
        });
        // const chats = await Chat.find({
        //     senderReceiver : sender_receiver ||  receiver_sender
        // });
        // console.log(`sdifiosdfsidhfsoiisdfi ${chats}`)

        // res.status(200).json({
        //     success: true,
        //     msg: "Message sent successfully",
        //     chats : chats  
        // });
        


    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: err.message
        })

    }

} 

module.exports = { createChatController, sendChatController, getUserChatsController };
