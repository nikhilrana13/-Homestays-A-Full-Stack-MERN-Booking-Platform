const express = require('express');
const hostModel = require('../models/hostModel');
const roomModel = require('../models/roomModel');
const mongoose = require('mongoose');




const hostCreateProfile = async(req,res)=>{

     try {
        
        let {userId,name,email,contactNumber,profilepicture} = req.body;
        console.log(req.body);

 // Convert userId to ObjectId if needed

        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //     return res.status(400).json({ message: "Invalid userId format" });
        // }


   
      userId = new mongoose.Types.ObjectId(userId); 

      const existingHost = await hostModel.findOne({userId });
      console.log("existing host:",existingHost);

      if (existingHost) {
        return res.status(400).json({ message: "User already has a host profile" });
      }
  
    // ✅ Check if email already exists

        const host = await hostModel.findOne({email})
        if(host){
            return res.status(500).json({message:'email already exists'})
        }
         // ✅ Create new host profile
        const newHost = await hostModel.create({
            userId,
            name,email,contactNumber,profilepicture
        },)
       
        await newHost.save();
        return res.status(201).json({message:'profile created successfully',newHost})
        
     } catch (error) {
        console.log('error',error)
        return res.status(500).json({message:'failed to create profile',error})
        
     }
}

 const updateHostProfile = async(req,res)=>{
    try {
        const {name,email,contactNumber,profilepicture} = req.body;
        const hostId = req.params.id;
        // console.log('hostid',hostId)


        const objectuserId = new mongoose.Types.ObjectId(hostId);

        const updatedHost = await hostModel.findOneAndUpdate({userId:objectuserId},{name,email,contactNumber,profilepicture},{new:true});

        if(!updatedHost){
            return res.status(404).json({message:'host not found'})
        }

        res.status(200).json({message:'profile updated successfully',updatedHost})

        
    } catch (error) {
        return res.status(500).json({message:'failed to update profile',error:error.message})
        
    }
 }


 const getHostprofile = async(req,res)=>{
    try {
        const hostId = req.params.id;
        // console.log('hostid',hostId)

        // 
        const objectuserId = new mongoose.Types.ObjectId(hostId);
        const host = await hostModel.findOne({userId:objectuserId}).populate('rooms');
        if(!host){
            return res.status(404).json({message:'host not found'})
        }

        res.status(200).json({message:'profile fetched successfully',host})


    } catch (error) {
        return res.status(500).json({message:'failed to fetch profile',error:error.message})
        
    }

 }
const  addRoom = async(req,res)=>{
     try{ 

        // ✅ Get userId from request params

        const userId = req.params.id.trim()
        //  console.log("user id",userId)
        //  console.log("req body",req.body)
        //  console.log("req files",req.file)
       
        const {price,city,description,address,image,title,facilities} = req.body

        if(!req.file){
            return res.status(400).json({message:'image is required'})
        }

        const imagebase64 = req.file ? req.file.buffer.toString("base64") : image;
       
        console.log("Searching for Host with userId:", userId);
        console.log("Received userId:", userId);
          const host = await hostModel.findOne({userId});
          console.log("Found Host:", host);

          if(!host){
            
        //   
            return res.status(404).json({message:'Host not found for this user please create a profile'})
          }

          const hostId=host._id;
        //   console.log('hostid:',hostId)   


     // Automatically generate start and end dates (e.g., using current date and 1 year duration //
        const startDate = new Date();
        const endDate = new Date();
        endDate.setFullYear(startDate.getFullYear() + 1);

        
        const  newroom = await roomModel.create({
            hostId,
            price,city,description,address,availability:{startDate:startDate,endDate:endDate},image:imagebase64,title,facilities
        })


        const savedRoom = await newroom.save();
        // console.log('room details',savedRoom)
      
      
        await hostModel.findByIdAndUpdate({_id:hostId},{$push:{rooms:savedRoom._id}})


        // console.log("Sending Response:", {
        //     ...savedRoom._doc,
        //     image: `data:image/jpeg;base64,${savedRoom.image}`
        // });

    res.status(200).json({message:"room added successfully 😇 ",room:{...savedRoom._doc,image:`data:image/jpeg;base64,${savedRoom.image}`}})
     }catch(error){
        res.status(500).json({message:"failed to add room",error:error.message})
     }
}


 const updateRoomDetails = async(req,res)=>{
      try{
        const {id,price,city,description,hostId,address,availability,image,title} = req.body;
        //    // Find the room by ID and update it
        const room = await roomModel.findByIdAndUpdate({_id:id},
            {price,city,description,hostId,address,availability,image,title},{new:true})

        //   if room was not found //
            if(!room){
                return res.status(404).json({message:"room not found"})
            }
        res.status(200).json({message:"room updated successfully 😇",room})

      } catch(error){
        res.status(500).json({message:"failed to update room",error:error.message})
      }

 }


 const deleteRoom = async(req,res)=>{
    try {
        const {id} = req.params;
        const room = await roomModel.findByIdAndDelete(id)

        if(!room){
            return res.status(404).json({message:"room not found"})
        }
        res.status(200).json({message:"room deleted successfully 😇 "})

    } catch (error){
        res.status(500).json({message:"failed to delete room",error},error.message)
    }
       
 }

module.exports = {addRoom,updateRoomDetails,deleteRoom,hostCreateProfile,updateHostProfile,getHostprofile}