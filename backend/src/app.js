import express, { urlencoded } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.route.js";
import Message from "./models/message.model.js";
import MessageRoutes from "./routes/message.route.js";
import User from "./models/user.model.js";

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
	"http://localhost:3000",
	"https://chat-app-socketio-01.vercel.app",
];

const io = new Server(server, {
	cors: { origin: allowedOrigins, credentials: true },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) return callback(null, true);
			return callback(new Error("Not allowed by cors"));
		},

		credentials: true,
	}),
);

// REST APIs
app.get("/api/health", (req, res) => {
	res.send("Health route working");
});

app.use("/api", userRoutes);
app.use("/api", MessageRoutes);

// SOCKET CONNECTION
const userSockets = new Map();

io.on("connection", (socket) => {
	console.log(socket.id, "user socket connected");

	//get user id
	socket.on("login", async (userId) => {
		if (!userId) return;

		try {
			socket.userId = String(userId);

			if (!userSockets.has(String(userId))) {
				userSockets.set(String(userId), new Set([socket.id]));
				//update db
				await User.findByIdAndUpdate(String(userId), {
					isOnline: true,
					lastSeen: null,
				});

				io.emit("user-status", {
					userId: String(userId),
					isOnline: true,
					lastSeen: null,
				});
			} else {
				userSockets.get(String(userId)).add(socket.id);
			}
			console.log(`User id ${userId} received.`);
		} catch (error) {
			console.error("Error handling socket connection:", error);
		}
	});

	// get private messages
	socket.on("private-message", async (payload) => {
		try {
			const { receiver, message } = payload || {};
			console.log("Incoming payload", payload);

			if (!socket.userId || !receiver || !message) {
				console.warn("Missing data: Missing sender, recipient, or message");
				return;
			}

			const newMessage = await Message.create({
				sender: socket.userId,
				receiver,
				message,
			});

			const populatedData = await Message.findById(newMessage._id)
				.populate("sender", "username profileUrl")
				.populate("receiver", "username profileUrl");

			socket.emit("private-message", populatedData);

			//send message to receiver
			const receiverSockets = userSockets.get(String(receiver));
			if (receiverSockets?.size > 0) {
				receiverSockets.forEach((socket) => {
					io.to(socket).emit("private-message", populatedData);
				});

				console.log(`Message successfully sent to ${receiverSockets.size}`);
			} else {
				console.log(`Recipient ${receiver} is offline. Message saved to DB.`);
			}
		} catch (error) {
			console.log("Error in private message:", error);
		}
	});

	//unread count
	socket.on("mark-read", async (senderId) => {
		if (!senderId || !socket.userId) return;
		console.log(senderId, "mark read senderId");

		try {
			await Message.updateMany(
				{
					sender: senderId,
					receiver: String(socket.userId),
					isRead: false,
				},
				{ $set: { isRead: true } },
			);

			//update to the every socket of user
			const receiverSockets = userSockets.get(String(socket.userId));
			if (receiverSockets?.size > 0) {
				receiverSockets.forEach((socketId) => {
					io.to(socketId).emit("messages-read", senderId);
				});
			}
		} catch (error) {
			console.error("Error marking messages as read:", error);
		}
	});

	//clean up maps on closing tabs
	socket.on("disconnect", async () => {
		if (!socket.userId) return;

		try {
			if (userSockets.get(String(socket.userId)).size > 0) {
				userSockets.get(String(socket.userId)).delete(socket.id);
			}

			if (userSockets.get(String(socket.userId)).size === 0) {
				userSockets.delete(String(socket.userId));
				const lastSeen = new Date();
				//update db
				await User.findByIdAndUpdate(String(socket.userId), {
					isOnline: false,
					lastSeen,
				});

				io.emit("user-status", {
					userId: String(socket.userId),
					isOnline: false,
					lastSeen,
				});
			}
			console.log(`User ${socket.userId} cleared from registry.`);
		} catch (error) {
			console.error("Error handling socket disconnect:", error);
		}
	});
});

app.use(notFound);
app.use(errorHandler);

export default server;
