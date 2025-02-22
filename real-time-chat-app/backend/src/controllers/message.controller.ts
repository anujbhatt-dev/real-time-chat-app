import { Request, Response } from "express";
import Message from "../models/message.model";
import User from "../models/user.model";
import cloundinary from "../lib/cloudinary";
import { getSocketdByUserId, io } from "../lib/socket";


export const getUsersforSidebar = async (req:Request,res:Response) =>{    
    try {
        const loggedInUserId = req.user?._id
        const allUsersExceptMe = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json({message:"users found successfully", users:allUsersExceptMe})
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getAllMessages = async ( req:Request,res:Response)=>{
    try {
        const messages = await Message.find()
        res.status(400).json({message:"all messages",messages})
    } catch (error) {
        
    }
}

export const getMessagesById = async (req:Request,res:Response) =>{
    try {
    const myId = req.user?.id
    const userToChat = req.params.id
    console.log(myId,userToChat);
    
    if(!myId) return res.status(400).json({message:"your id not available"})
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChat},
                {senderId:userToChat, receiverId:myId}
            ]
        })

        res.status(200).json({
            messages
        })
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { text, image } = req.body;
        const senderId = req.user?.id
        const {id:receiverId} = req.params

        if (!senderId || !receiverId || (!text && !image)) {
            return res.status(400).json({ message: "Sender, receiver, and either text or image are required" });
        }
        let imageUrl:string=""
        if(image){
            const uploadResponse = await cloundinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }


        const newMessage = new Message({ senderId, receiverId, text, image:imageUrl });
        await newMessage.save();


        const receiverSocketId = getSocketdByUserId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const { messageId } = req.params;

        const deletedMessage = await Message.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ message: "Server error" });
    }
};
