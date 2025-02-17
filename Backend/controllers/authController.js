
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');






// sign up form //

const UsersignUp = async (req,res)=>{

    try{

        const {name,email,password,role} = req.body;

        // check if user email exists already //
        const user = await userModel.findOne(({email}))
    if(user){
          return res.status(500).json({message:"email already exists"})     
    }

    // create user //
    const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await userModel.create(({
                   name,
                   email,
                   password: hashedPassword,
                   role
      }))

        let token = jwt.sign({userid:createdUser._id,role:createdUser.role},process.env.JWT_SECRET_KEY)
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax"

        })

         createdUser.save()
         console.log(createdUser)

        res.status(200).json(({message:"Account created successfully", user:createdUser}))
      
    }catch(error){
        res.status(500).json({message:"internal server error",error:error.message})

    }
  
}

// login form

const UserLogin = async (req,res)=>{
    try{
        const {email,password} = req.body;

        // check if user email exist or not //
        const user = await userModel.findOne(({email}))

        if(!user){
            return res.status(500).json({message:"User not found please sign up 😇" })
        }

        const isMatch =   await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({message:"Invalid password or email 😒" })
        }
      

        console.log("user",user);
        let token = jwt.sign({userid:user._id,role:user.role},process.env.JWT_SECRET_KEY)
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax"

        }) 
        if(isMatch){
            return res.status(200).json({message:"Login Successful 😇",token, user});
            
        }

    }catch(error){
        res.status(500).json({message:"Internal server error",error: error.message})

    }
}

const Logout = async (req, res) => {
    try {
        // console.log("Cookies before clearing:", req.cookies); 

        
        if (!req.cookies || !req.cookies.token) {
            // console.log("No token found in cookies");
            return res.status(400).json({ message: "No token found" });
        }

        res.clearCookie("token", {
            httpOnly: true,  // ✅ Ensure it matches how the cookie was set
            secure: false,   // ❌ Use `true` in production with HTTPS
            sameSite: "Lax",
            path: "/"        // ✅ Ensure correct path
        });

        console.log("Cookie cleared");
        res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {UsersignUp,UserLogin,Logout}









