const mongoose = require("mongoose");
const multer = require('multer')


const storage = multer.memoryStorage();
const upload = multer({storage:storage})


const roomSchema = mongoose.Schema({
       hostId: {type:mongoose.Schema.ObjectId, ref:'host',required : true},
       title:{type:String,required:true},
       description:{type:String,required:true},
       price:{type:Number,},
    //    image:{type:[String],default:["https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc="]},
       image:{type:String,required:true},
       city:{type:String,required:true},
       address:{type :String, required: true},
       facilities: [{ type: String ,reuired: true}],
       availability:{
           startDate: {type:Date,},
           endDate: {type:Date,}
       }
})

const roomModel = mongoose.model('room',roomSchema)
module.exports = roomModel