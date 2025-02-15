import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model'; // Adjust the path based on where your User model is stored
import { getJWTToken } from '../utils/getJWTToken';
import cloundinary from '../lib/cloudinary';

// Signup Controller
export const signup = async (req: Request, res: Response) => {
    const { fullname, email, password, profilePic } = req.body;

    // Basic Validation (You can add more validation here)
    if (!fullname || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    if (password.length<6) {
        return res.status(400).json({ message: 'Password should be atleast 6 characters.' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            profilePic: profilePic || 'user' // Default to 'user' if no profilePic is provided
        });
        
        // Generate JWT token for the user
        const token = getJWTToken(newUser.id.toString(),res);


        // Save the user to the database
        const savedUser = await newUser.save();

        // Send success response with token
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: savedUser._id,
                fullname: savedUser.fullname,
                email: savedUser.email,
                profilePic: savedUser.profilePic
            },
            token // Include token in the response
        });
    } catch (error) {
        // Error handling
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


export const login = async (req:Request,res:Response)=>{
    const {password,email} = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(400).json({message:"Invalid Credentials"})

    try {
        const hashedPassword = await bcrypt.compare(password,user.password)

        if(!hashedPassword) return res.status(400).json({message:"Invalid Credentials"})
        
        const token = getJWTToken(user.id,res);
        res.status(201).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilePic: user.profilePic
            },
            token // Include token in the response
        });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    } 
}

export const logout = (req:Request,res:Response)=>{
    res.cookie("token", "");
    res.status(200).json({message:"logged out successfully!!"})
}

export const uploadProfile = async(req:Request,res:Response) =>{
    try {
        const {profilePic} = req.body;
        const userId = req.user?.id
    
        if(!profilePic) return res.status(400).json({message:"Profile pic is Required"})
        
        const uploadResponse = await cloundinary.uploader.upload(profilePic)
        const uploadedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
    
        res.status(200).json(uploadedUser)        
    } catch (error) {
        console.error('Error in update profile:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

export const checkAuth = (req:Request,res:Response)=>{
    try{
        res.status(200).json(req.user);
    } catch (error) {
        console.error('Error in checkauth controller:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}