

import express from "express"
import dotenv from "dotenv"//for .env dotenv.config()
import mongoose from "mongoose"// to connect MongoDB

import userRoutes from './routes/userRoutes.js'; 
import cors from 'cors';


const app = express()
// DOES NOT Work for Vercel
// app.use(cors({
//     origin: ["https://project-theta.vercel.app/"],
//     methods: ["GET", "POST"]
// }));

app.use(express.json());

//app.use(cors({ origin: ['https://online-shop-frontend-theta.vercel.app/'], credentials: true }))
app.use(cors({ origin: ['https://online-shop-frontend-theta.vercel.app'], credentials: true }))//<==== IT Works for Vercel


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






















