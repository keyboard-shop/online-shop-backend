

import express from "express"
import dotenv from "dotenv"//for .env dotenv.config()
import mongoose from "mongoose"// to connect MongoDB

import userRoutes from './routes/userRoutes.js'; 

const app = express()
app.use(express.json());

dotenv.config()// for .env ==> process.env.PORT
const PORT = process.env.PORT

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('OK MongoDB Atlas has been successfully connected - ONLINE SHOP !!!')
    })
    .catch((err) => {
        console.log('NOT CONNECTED to MongoDB', err)
    })

// to ==> routes/userRoutes.js
app.use('/api/users', userRoutes);


app.listen(process.env.PORT, () => {
    console.log(`OK server at ${PORT} is running`);
});