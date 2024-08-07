const express = require("express");
const User = require("../models/user");
const router = express.Router();


router.get("/getAllUser", async(req,res) => {
    try{
        const users = await User.find();
        if(!users) {
            return res.status(400).json({
                success : false,
                msg : "No Users found!",
            })
        }
        res.status(200).json({
            success : true,
            msg : "User found",
            users
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            msg : "Internal server error",
            error : err.message
        })
    }
});

module.exports = router;