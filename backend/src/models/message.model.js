import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Message sender is required"],
		},
		receiver: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Message receiver is required"],
		},
		message: {
			type: String,
			required: [true, "Message is required"],
		},
		chatType: {
			type: String,
			default: "private",
			enum: ["private", "group"],
		},
	},
	{ timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
