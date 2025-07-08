import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student" , "recruiter"],
        required: true
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String}, // Url to resume file
        resumeOriginalname: {type: String},
        compony: {type:mongoose.Types.ObjectId , ref:"Compony"}, 
        profilePhote: {type: String , default: ""}
    }
    
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)