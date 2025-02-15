import mongoose from "mongoose";

export const db = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error:\n ${error}`);
        process.exit(1); // Exit the process to prevent running in a broken state
    }
};
