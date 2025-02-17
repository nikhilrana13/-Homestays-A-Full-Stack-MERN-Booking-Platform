const express = require('express');
const router = express.Router();
const multer = require('multer');


const {addRoom,updateRoomDetails,deleteRoom,hostCreateProfile,updateHostProfile,getHostprofile} = require('../controllers/hostController');


const storage = multer.memoryStorage();
const upload = multer({storage:storage})




router.post('/host/profile',hostCreateProfile);
router.put('/host/:id/update',updateHostProfile);
router.get('/host/:id',getHostprofile);
router.post('/host/:id/addroom',upload.single('image'),addRoom);
router.get('/host/:id/update/:roomid',updateRoomDetails);
router.get('/host/:id/delete/:roomid',deleteRoom);

module.exports = router




