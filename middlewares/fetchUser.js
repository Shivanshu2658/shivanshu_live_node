const jwt = require('jsonwebtoken');


const requireSignIn = async (req,res,next) => {
    try{
        const token = req.header("Authorization");
        if(!token) {
            return res.status(401).json({
                success : false,
                msg : "Unauthorized access"
            });
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if(!data) {
            return res.status(401).json({
                success : false,
                msg : "Unauthorized access, Please provide valid token"
            });
        }
        req.user = data.userId;
        next();
    }
    catch(err){
        
        res.status(400).json({
            success : false,
            msg : "Authentication Error",
            error : err.message
        })
    }
} 

module.exports = requireSignIn;