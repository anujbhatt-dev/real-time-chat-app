import express, { RequestHandler } from "express";
import { sendMessage, getUsersforSidebar, getMessagesById, getAllMessages } from "../controllers/message.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/users",protectedRoute as RequestHandler , getUsersforSidebar)
router.get("/:id", protectedRoute as RequestHandler, getMessagesById as RequestHandler)
router.post("/send/:id", protectedRoute as RequestHandler, sendMessage as RequestHandler)
router.get("/", getAllMessages as RequestHandler);
// router.get("/:senderId/:receiverId", getMessages as RequestHandler);
// router.delete("/:messageId", deleteMessage as RequestHandler);

export default router;
