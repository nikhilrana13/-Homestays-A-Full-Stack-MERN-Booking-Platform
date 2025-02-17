const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoute')
const roomRoutes = require('./routes/roomRoute')
const hostRoute = require('./routes/hostRoute')
const cors = require('cors');
const cookieParser = require("cookie-parser");




dotenv.config();

const app = express();
const allowedOrigins = ["http://localhost:5172", "http://localhost:5175"];

app.use(cors({
    origin: function(origin, callback){
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }

    },
    credentials:true
}))

const PORT = process.env.PORT || 4000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());







// connect mongodb //

console.log("Mongo URL:", process.env.MONGO_URL)
 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log('failed to connect to mongodb',err)
})


  
// routes //

app.use('/api/user', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api',hostRoute)






app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

