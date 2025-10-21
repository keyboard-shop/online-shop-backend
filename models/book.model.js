



import mongoose from "mongoose";


const bookSchema = new mongoose.Schema(
    {
        bookname: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

        // a book added by this seller:
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Onlineuser',//from user.model.js
            required: true,
        },
        
    },

    {
        timestamps: true, // createdAt, updatedAt 
    }
);

// const Book = mongoose.model("createdbook", bookSchema); //ORIGINAL
const Book = mongoose.model("createdbookwithseller", bookSchema);

export default Book;