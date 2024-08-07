const express = require("express");
const { createChatController, sendChatController,getUserChatsController } = require("../controllers/chatsControlller");
const { body } = require("express-validator");
const requireSignIn = require("../middlewares/fetchUser");

const router = express.Router();


router.post("/createChats", [
    body("message", "Message is required").exists(),
    body("receiverId", "Receiver is required").exists(),
], requireSignIn, createChatController);
router.post("/sendChats", [
    body("message", "Message is required").exists(),
    body("receiverId", "Receiver is required").exists(),
], requireSignIn, sendChatController);
router.post("/getUserChats", [
    body("receiverId", "Receiver is required").exists(),
], requireSignIn, getUserChatsController);



module.exports = router;