import express from 'express'
import authRoutes from "./routes/auth.route"
import messageRoutes from "./routes/message.route"
import dotenv from 'dotenv'
import { db } from './lib/db'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const PORT =  process.env.PORT || 8080


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.listen(PORT,()=>{
    console.log("running on PORT: "+ PORT);
    db()
})