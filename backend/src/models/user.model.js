import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			minLength: 2,
			maxLength: 16,
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: 8,
			select: false,
		},
		profileUrl: {
			type: String,
			default:
				"https://img.magnific.com/premium-vector/young-gamer-girl-avatar-streaming-with-pastel-purple-hair-gaming-headset_704771-3476.jpg?semt=ais_hybrid&w=740&q=80",
		},
		isOnline: { type: Boolean, default: false },
		lastSeen: { type: Date, default: null },
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
