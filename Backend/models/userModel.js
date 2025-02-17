const mongoose = require("mongoose");

const userSchema  = mongoose.Schema({
     name: {
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     role:{
        type:String,
        enum:['host','guest'],
        default:['guest'],
        required:true
     },
     profilepicture:{
        Type:String,
        
     },
    


},{timestamps:true});


const userModel = mongoose.model('user',userSchema);
module.exports = userModel;




