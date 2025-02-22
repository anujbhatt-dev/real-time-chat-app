import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

type IUserSocketMap = {
  [userId: string]: string; // userId maps to socketId
};

const userSocketMap: IUserSocketMap = {};


export const getSocketdByUserId = (userId:string) => {
    return userSocketMap[userId]
}

io.on("connection", (socket) => {
  // Ensure userId is a string, not a string[]
  const userId = Array.isArray(socket.handshake.query.userId)
    ? (socket.handshake.query.userId[0] as string) // Explicitly cast to string if it's an array
    : (socket.handshake.query.userId as string);  // Explicitly cast to string

  if (!userId) {
    console.log("No userId provided for connection:", socket.id);
    return; // Optionally disconnect the socket if userId is required
  }

  console.log("A user connected:", socket.id, userId);
  userSocketMap[userId] = socket.id;

  // Emit to all clients the updated online users
  io.emit('getOnlineUsers', Object.keys(userSocketMap)); // Changed event name here

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap)); // Emit again on disconnect
  });
});

export { io, app, server };
