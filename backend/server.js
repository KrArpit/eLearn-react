require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes/index'); 

const app = express();
const PORT = process.env.PORT || 5001;
const DB_URL = process.env.DB_URL;

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/auth',authRoutes);

//database connection
mongoose.connect(DB_URL)
    .then(()=>console.log("Database connection success"))
    .catch((e)=>console.log("Database connection failed & error is"+ e));

app.listen(PORT,()=>{
    console.log(`Server is now running on Port ${PORT}`)
})