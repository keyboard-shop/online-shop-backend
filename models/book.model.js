



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
    },

    {
        timestamps: true, // createdAt, updatedAt 
    }
);

const Book = mongoose.model("createdbook", bookSchema);

export default Book;