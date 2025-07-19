import mongoose from "mongoose";

const componySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    logo:{
        type: String, //Url compony logo
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
} , {timestamps: true})

export const Compony = mongoose.model("Compony" , componySchema)