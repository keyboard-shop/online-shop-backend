


import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import UserCreate from '../models/user.model.js';
import Book from '../models/book.model.js'


// Register User, It Works
export const userRegister = async (req, res) => {

    try {

        //console.log("Hashed USER registered succeccfully ===>", req.body) //it shows user's data in the Terminal

        const { onlinename, email, password } = req.body;

        // Input validation
        //  if (!onlinename || !email || !password) {
        //     return res.status(400).json({ message: 'All fields are required' });
        // }

        // Check if the user already exists
        const existingUser = await UserCreate.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Online Shop User already exists' });
        }

        // Hash the password, option 1 
        const hashedPassword = await bcryptjs.hash(password, 10);
        // Hash the password, option 2 without 'await'
        //const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create a new user 
        const newOnlineUser = new UserCreate({
            onlinename,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newOnlineUser.save();

        res.status(201).json({ status: true, message: 'User registered successfully for the ONLINE SHOP' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// USER Log-In, It Works
export const userLogin = async (req, res) => {
    try {

        console.log("USER Logged-In successfully ===>", req.body) //it shows user's data in the Terminal

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'Email and Password are required' });
        }

        // Find the user by email
        const user = await UserCreate.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: false, message: 'User not found' });
        }

        // it compares the entered password in the <form> with the stored hashed password in MongoDB
        // option 2
        // const isMatchedPassword = bcryptjs.compare(password, user.password);
        // option 1
        const isMatchedPassword = await bcryptjs.compare(password, user.password);
        if (!isMatchedPassword) {
            return res.status(400).json({ status: false, message: 'Wrong Credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // const expiryDate = new Date(Date.now() + 3600000); // 1 hour Optional expiration time
        // res.cookie('access_token', token, { httpOnly: true, expires: expiryDate  }) Optional expiration time
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({ status: true, message: 'this USER Got the TOKEN successfully', user: { _id: user._id, email: user.email, password: user.password } });

        console.log("USER got the token ===>", user) //it shows user's data in the Terminal

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};


// 1 sign out
// it DOES NOT delete cookie from the browser
// export const userOut = (req, res) => {
//     res.clearCookie('access_token').status(200).json({ message: 'Signout success!' });
//   };

// 2 sign out. it works
export const userOut = (req, res) => {
    res.setHeader('Clear-Site-Data', '"cookies", "storage", "cache"').status(200).send({ message: 'Logged out successfully' });
};




// createBook, to routes/userRoutes.js
export const createBook = async (req, res) => {

    const book = req.body; // <form> will send this data or from Postman

    if (!book.bookname || !book.price || !book.author) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newBook = new Book(book);

    try {
        await newBook.save();
        res.status(201).json({ success: true, data: newBook });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};








// get all books
export const getAllBooks = async (req, res) => {
    try {
        const allbooks = await Book.find({});
        res.status(200).json({ success: true, data: allbooks });
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};



















