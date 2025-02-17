const express = require("express");
const { UsersignUp, UserLogin, Logout } = require("../controllers/authController");
const userModel = require("../models/userModel");
const router = express.Router();
const jwt = require('jsonwebtoken')



router.get('/auth',async(req,res)=>{
    const token = req.cookies.token;
    // console.log("cookies",req.cookies);
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    } 
     try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.userid);

        if(!user){
            return res.status(401).json({message:"user not found"});
        }
        res.json({token,role:user.role,userid:user._id,name:user.name});
        
        
     } catch (error) {
        return res.status(401).json({message:"Invalid token"});
        
     }
})

router.post('/signup',UsersignUp);
router.post('/login',UserLogin)
router.post('/logout',Logout)

module.exports = router;


