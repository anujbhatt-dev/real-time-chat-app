import { Request, Response } from "express";
import Message from "../models/message.model";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId, text, image } = req.body;

        if (!senderId || !receiverId || (!text && !image)) {
            return res.status(400).json({ message: "Sender, receiver, and either text or image are required" });
        }

        const newMessage = new Message({ senderId, receiverId, text, image });
        await newMessage.save();

        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId } = req.params;

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Sender and receiver IDs are required" });
        }

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
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
