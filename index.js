

import express from "express"
import dotenv from "dotenv"//for .env dotenv.config()
import mongoose from "mongoose"// to connect MongoDB

import userRoutes from './routes/userRoutes.js'; 
import cors from 'cors';
import cookieParser from "cookie-parser";

//import verifyToken from "./middlewares/verifyToken.js";


const app = express()
// DOES NOT Work for Vercel
// app.use(cors({
//     origin: ["https://project-theta.vercel.app/"],
//     methods: ["GET", "POST"]
// }));

app.use(express.json());

app.use(cookieParser());

//app.use(cors({ origin: ['https://online-shop-frontend-theta.vercel.app/'], credentials: true }))
//app.use(cors({ origin: ['https://online-shop-frontend-theta.vercel.app'], credentials: true }))//<==== IT Works for Vercel
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));



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


// test
// Protected PersonalPage Route, TESTING
// app.get('/personal-page', verifyToken, (req, res) => {
//        // ORIGINAL   res.json({ message: "Welcome to your Personal Page", userId: req.userId });
//        // This includes the token and userId from response
//        res.json({ 
//         message: "Access granted", 
//         userId: req.userId,
//         token: res.locals.token 
//     });
// });


app.listen(process.env.PORT, () => {
    console.log(`OK server at ${PORT} is running`);
});






















