const hostModel = require("../models/hostModel");
const roomModel = require("../models/roomModel");



const  getAllRooms = async (req,res) =>{
     const {city,minPrice,maxPrice,startDate,endDate} = req.query;
    try{
        //   build query for filtering rooms //
         let query = {};
    //  city filter //
         if(city){
            query.city = city
         }
        //  price filter /
         if(minPrice && maxPrice){
            query.price = {$gte:minPrice,$lte:maxPrice}
         }
          // availability filter //
          if(startDate || endDate){
            query["availability.startDate"] = {$lte: new Date(startDate)}
            query["availability.endDate"] = {$gte: new Date(endDate)}
        }
        const rooms = await roomModel.find(query).populate('hostId','name email profilepicture contactNumber city address');
        console.log('all rooms',rooms)
        res.status(200).json({rooms})
    }catch(error){
        res.status(500).json({message:"failed to get rooms",error},error.message)
    }
}



module.exports = getAllRooms;
