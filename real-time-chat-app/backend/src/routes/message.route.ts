import express, { RequestHandler } from "express";
import { sendMessage, getMessages, deleteMessage } from "../controllers/message.controller";

const router = express.Router();

router.post("/send", sendMessage as RequestHandler);
router.get("/:senderId/:receiverId", getMessages as RequestHandler);
router.delete("/:messageId", deleteMessage as RequestHandler);

export default router;
