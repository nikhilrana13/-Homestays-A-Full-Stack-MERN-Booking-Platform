const express = require('express')
const getAllRooms  = require('../controllers/roomController');
const router = express.Router();


router.get('/',getAllRooms);








module.exports = router