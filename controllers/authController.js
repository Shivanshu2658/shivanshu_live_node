const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require('jsonwebtoken');


const userRegisterController = async (req, res) => {
    try {
        const errors = validationResult(req.body);

        if (!errors.isEmpty) {
            return res.status(400).json({
                success: false,
                msg: "Please provide valid credentials",
                error: errors.array()

            })
        }

        const { firstName, lastName, email, password, userName } = req.body;
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "User already exists"
            })
        }
        user = await User.create({
            firstName, lastName, email, password: securePassword, userName
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Error while creating user."

            })
        }
        res.status(201).json({
            success: true,
            msg: "User register successful."
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: err.message
        })

    }
}

const userLoginController = async (req, res) => {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty) {
            return res.status(400).json({
                success: false,
                msg: "Invalid credentials",
                errors: errors.array()
            })
        }
        const { email, password } = req.body;
        let user = await User.findOne({email});

        if(!user) {
            
            return res.status(400).json({
                success : false,
                msg : "User with this email not exists"
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(400).json({
                success : false,
                msg : "Invalid credentials"
            })
        }
        const data = {
            userId : {
                id: user._id
            }
        }

        const token  =  await jwt.sign(data, process.env.JWT_SECRET)
        return res.status(200).json({
            success : true,
            msg : "Login successful",
            token
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}




module.exports = {
    userRegisterController,
    userLoginController,
}