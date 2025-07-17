import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !role){
      return res.status(400).json({
        message: "Some information is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exsist",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log("Register error", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Some information is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Not found",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account dost not exist with this role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 100,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login Successfully",
        user,
        success: true,
      });
  } catch (error) {
    console.log("Login error", error);
  }
};

export const logout = async (req , res) => {
    try {
        return res.status(200).cookie("token" , {maxAge: 0}).json({
            message: "Logout Successfully",
            success: true
        })
        
    } catch (error) {
        console.log("Logout error", error);
        
    }
}

export const updateProfile = async(req , res) => {
    try {
        const {fullname , email , phoneNumber , bio , skills} = req.body
        const file = req.file
    // cloudinary file here
      const fileUri = getDataUri(file)
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    let skillsArray;
    if(skills) skillsArray = skills.split(",")

    const userId = req.id  //middleware authentication

    let user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({
        message: "User Not found",
        success: false,
      });
    }

    // updating data
   if(fullname) user.fullname = fullname
   if(email) user.email = email
   if(phoneNumber) user.phoneNumber = phoneNumber
   if(bio) user.profile.bio = bio
   if(skills) user.profile.skills = skillsArray

    // resume comes later Url of cloudinary
    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url  // save the cloudinary url
      user.profile.resumeOriginalname = file.originalname 
    }

    await user.save()

     user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .json({
        message: "Profile Updated Successfully",
        user,
        success: true,
      });

    } catch (error) {
        console.log("Updated Profile error" , error);
        
    }
}
