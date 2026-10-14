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
