import express from "express"
import authRoutes from "./routes/auth.route"
import messageRoutes from "./routes/message.route"
import dotenv from 'dotenv'
import { db } from './lib/db'
import cookieParser from 'cookie-parser'
import cors from "cors"
import { app, server } from "./lib/socket"
dotenv.config()


const PORT =  process.env.PORT || 8080


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allows cookies & authentication headers
    // methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    // allowedHeaders: ["Content-Type", "Authorization"] // Headers allowed in requests
}));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

server.listen(PORT,()=>{
    console.log("running on PORT: "+ PORT);
    db()
})