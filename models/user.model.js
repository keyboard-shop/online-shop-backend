


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        onlinename: {
            type: String,
            required: true,
            //unique: true,
        },
        email: {
            type: String,
            required: true,
            //unique: true,
        },
        password: {
            type: String,
            required: true,
            //unique: true,
        },
    },
    { timestamps: true }
);

const UserCreate = mongoose.model("Onlineuser", userSchema);
export default UserCreate;