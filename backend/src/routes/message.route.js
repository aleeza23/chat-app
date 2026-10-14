import express from "express";
import { getChatMessagesController } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/chats/:senderId/:receiverId", getChatMessagesController);

export default router;
