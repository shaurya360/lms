
import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generatetoken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const register = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({success:false , message: "Please fill in all fields."});
        }
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({success:false , message: "Email already exists."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password:hashedPassword});
        await newUser.save();
        res.status(201).json({success:true , message: "User created successfully."});


    }
    catch (error) {
        return res.status(500).json({
            success:false ,
            message: "failed to register"
        })
    }
}
export const login = async (req,res) => {
    try {
        
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({success:false , message: "Please fill in all fields."});
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success:false , message: "Email or password doesnt exist."});
        }
        
        const ispasswordmatch = await bcrypt.compare(password, user.password);
        if(!ispasswordmatch) {
            return res.status(400).json({success:false , message: "Email or password doesnt exist"});
        }
        
        generateToken(res,user,`welcome back ${user.name}`)
        


    }
    catch (error) {
        return res.status(500).json({
            success:false ,
            message: "failed to login"
        })
    }
}

export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true ,
            message: "logged out successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success:false ,
            message: "failed to logout"
        })
    }
}

export const getUserProfile = async (req,res) => {
    try {
        const userId=req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledcourses");
        if(!user) {
            console.log("nahi hai bc")
            return res.status(400).json({success:false , message: "User not found."});
        }
        return res.status(200).json({
            success:true ,
            user
        })
    }
    catch (error) {
        return res.status(500).json({
            success:false ,
            message: "failed to load User"
        })
    }
}

export const updateProfile = async (req,res) => {
    try {
        
        
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;
       
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            }) 
        }
        // extract public id of the old image from the url is it exists;
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name, photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
}