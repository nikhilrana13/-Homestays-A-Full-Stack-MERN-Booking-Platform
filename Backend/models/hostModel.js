const mongoose = require('mongoose')


const hostSchema = mongoose.Schema({
       userId:{type: mongoose.Schema.Types.ObjectId, ref:'user',required:true},
       name:{type:String,},
       email:{type:String,},
       profilepicture:{type:String,},
       contactNumber: { type: Number},
       rooms:[{type: mongoose.Schema.ObjectId, ref:'room'}]
})

const hostModel = mongoose.model('host',hostSchema)
module.exports = hostModel