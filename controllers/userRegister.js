


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

        const token = jwt.sign({ _id: user._id, onlinename: user.onlinename }, process.env.JWT_SECRET);
        // const expiryDate = new Date(Date.now() + 3600000); // 1 hour Optional expiration time
        // res.cookie('access_token', token, { httpOnly: true, expires: expiryDate  }) Optional expiration time
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({ status: true, message: 'this USER Got the TOKEN successfully', user: { _id: user._id, email: user.email, password: user.password, onlinename: user.onlinename } });

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



// 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
// ORIGINAL start it works ==================================
// createBook, to routes/userRoutes.js
// export const createBook = async (req, res) => {

//     const book = req.body; // <form> will send this data or from Postman

//     if (!book.bookname || !book.price || !book.author) {
//         return res.status(400).json({ success: false, message: "Please provide all fields" });
//     }

//     const newBook = new Book(book);

//     try {
//         await newBook.save();
//         res.status(201).json({ success: true, data: newBook });
//     } catch (error) {
//         console.error("Error in creating product:", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };
// ORIGINAL end it works =====================================





// this 'createBook' works OK
// seller _id comes from req Redux CreateBook.jsx
//MODIFIED from ORIGINAL above
// create a book with the 'seller' added in the Book Schema model
export const createBook = async (req, res) => {

    //const { bookname, author, price, sellerID } = req.body; // <form> will send this data or from Postman

    // approach-1 for 'sellerID'
    const { bookname, author, price, seller } = req.body; // <form> will send this data or from Postman

    //const SELLER = seller._id

    // approach-2 for 'sellerID'
    //const {sellerID} = req.query; // in URL the data after question mark ==> ?(here is the req.query)
    console.log("the book name is ===>", bookname)
    console.log("SERVER, the seller _id is ===>", seller)// it works
    console.log("seller._id", seller)// it works

    // approach-3 for 'sellerID' (approach-3 the best approach)
     //const {sellerID} = req.user + middleware verifyToken;


    // if (!bookname || !author || !price) {
    //     return res.status(400).json({ success: false, message: "Please provide all fields" });
    // }

    //const newBook = new Book(book);

    try {

        // it works
        if (!bookname || !author || !price || !seller) {
            return res.status(400).json({ success: false, message: "Please provide all fields" });
        }
        
        // payload/data(all the information of newBook)
        // const newBook = {
        //     bookname,
        //     author,
        //     price,
        //     seller: seller
        // };
        //await Book.create(newBook);

        // it works
        const newBook = new Book({
            bookname,
            author,
            price,
            seller,  // it works as expected if seller is a valid Object _id
        });
        await newBook.save(newBook);// it works
        res.status(201).json({ success: true, data: newBook });


    } catch (error) {
        console.error("Error in creating Book:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
//11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111





// 22222222222222222222222222222222222222222222222222222222222222222222
// ORIGINAL, get all books, it works, start ==================
// export const getAllBooks = async (req, res) => {
//     try {
//         const allbooks = await Book.find({});
//         res.status(200).json({ success: true, data: allbooks });
//     } catch (error) {
//         console.log("Error in fetching products:", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };
// ORIGINAL, get all books, it works, end ==================



// AAA MODIFIED from ORIGINAL above getAllBooks
// export const getAllBooks = async (req, res) => {

//     const {seller} = req.query;
//     console.log("const getAllBooks, the seller is ===>", seller)

//     try {
//         const allBooksByParticularSeller = await Book.find({
//             seller: seller// all the books of the particular seller (not all the website sellers)
//         });

//         res.status(200).json({ success: true, data: allBooksByParticularSeller });

//     } catch (error) {
//         console.log("Error in fetching products:", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };
// AAA


// BBB
export const getAllBooks = async (req, res) => {
    const { seller } = req.params; // seller _id from request parameters
    console.log("seller data from getAllBooks controller ===> ", seller)

    try {
        // Find books by seller _id
         // ORIGINAL: const books = await Book.find({ seller: seller });
         const books = await Book.find({ seller: seller }).populate('seller');
      
        if (!books.length) {
            return res.status(404).json({ success: false, message: "No books found for this seller" });
        }

        res.status(200).json({ success: true, data: books });

    } catch (error) {
        console.error("Error fetching books for seller:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
// BBB
// 22222222222222222222222222222222222222222222222222222222222222222222222222222222222



// all books from all sellers
export const getAllBooksFromAllSellers = async (req, res) => {
    try {
        const books = await Book.find().populate('seller'); // Fetches all books and populates seller details/data
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        console.error("Error fetching all books:", error.message);
        res.status(500).json({ success: false, message: "Server Error for all books fetching" });
    }
};





// it works
export const getPersonalPage = async (req, res) => {


    // it works
    try {
        // ORIGINAL    res.json({ message: "Access granted Welcome, Welcome, WElcome", userId: req.userId, onlinename: res.onlinename, token: res.locals.token});
        // ORIGINAL     res.json({ message: "Access granted, Welcome To Your Personal Page", userId: req.userId, token: res.locals.token });
   
             // Getting the onlinename from req.userId 
             const user = await UserCreate.findById(req.userId); 
             if (!user) {
                 return res.status(404).json({ message: "User not found" });
             }
     
             res.json({
                 message: "Access granted. Welcome!",
                 userId: req.userId,
                 onlinename: user.onlinename, 
                 token: res.locals.token
             });


    } catch (error) {
        console.error("Error Personal Page:", error.message);
        res.status(500).json({ success: false, message: "Server Error for Personal Page" });
    }
};
// ====================================================================================

















