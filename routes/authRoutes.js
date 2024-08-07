const express = require("express");
const User = require("../models/user");
const { userRegisterController,userLoginController } = require("../controllers/authController");
const { body } = require("express-validator");
const requireSignIn = require("../middlewares/fetchUser");
const router = express.Router();


router.post('/register', [
    body("firstName", "First name is required").exists(),
    body("lastName", "Last name is required").exists(),
    body("email", "email is required").exists(),
    body("password", "password must be of 8 characters").exists().isLength(
        {min : 8}
    ),
    body("userName", "userName is required").exists(),
], userRegisterController);

router.post('/login', [
    body("email", "email is required").exists(),
    body("password", "password must be of 8 characters").exists().isLength(
        {min : 8}
    ),
], userLoginController);



router.get("/getAllUser", async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(400).json({
                success: false,
                msg: "No Users found!",
            })
        }
        res.status(200).json({
            success: true,
            msg: "User found",
            users
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: err.message
        })
    }
});






// router.get("/getAllUser",requireSignIn, async (req, res) => {
//     try {
//         const users = await User.find();
//         if (!users) {
//             return res.status(400).json({
//                 success: false,
//                 msg: "No Users found!",
//             })
//         }
//         res.status(200).json({
//             success: true,
//             msg: "User found",
//             users
//         })
//     }
//     catch (err) {
//         res.status(500).json({
//             success: false,
//             msg: "Internal server error",
//             error: err.message
//         })
//     }
// });

module.exports = router;