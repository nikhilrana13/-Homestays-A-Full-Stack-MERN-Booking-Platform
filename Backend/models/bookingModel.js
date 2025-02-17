const mongoose = require('mongoose')



const bookingSchema  = mongoose.Schema({
      userid :{type:mongoose.Schema.ObjectId,ref:'user'},
      roomid :{type:mongoose.Schema.ObjectId, ref:'room'},
      startDate:{type:Date,required:true},
      endDate:{type:Date,required:true},
      status:{type:String,enum:["pending","confirmed","cancelled"],required:true,default:'pending'},
      totalprice:{type:Number, required:true},
},{timestamps:true})


const bookingModel = mongoose.model('booking',bookingSchema)
module.exports= bookingModel
