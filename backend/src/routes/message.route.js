import express from "express";
import {
	getChatMessagesController,
	getUnreadMessagesCount,
} from "../controllers/message.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/chats", protectRoute, getUnreadMessagesCount);
router.get(
	"/chats/:senderId/:receiverId",
	protectRoute,
	getChatMessagesController,
);

export default router;
