import mongoose from "mongoose";
import Message from "../models/message.model.js";

export const getChatMessagesController = async (req, res) => {
	const { senderId, receiverId } = req.params;

	const chats = await Message.find({
		chatType: "private",
		$or: [
			{ sender: senderId, receiver: receiverId },
			{ sender: receiverId, receiver: senderId },
		],
	})
		.sort({ createdAt: 1 })
		.populate("sender", "username profileUrl")
		.populate("receiver", "username profileUrl");

	res.status(200).json({ success: true, data: chats });
};

export const getUnreadMessagesCount = async (req, res) => {
	const unreadCount = await Message.aggregate([
		{
			$match: {
				receiver: new mongoose.Types.ObjectId(req.user._id),
				isRead: false,
				chatType: "private",
			},
		},
		{
			$sort: { createdAt: -1 },
		},
		{
			$group: {
				_id: "$sender",
				unreadCount: { $sum: 1 },
				lastMessage: { $first: "$message" },
			},
		},
	]);

	res.status(200).json({ success: true, data: unreadCount });
};
