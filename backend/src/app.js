import express, { urlencoded } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.route.js";
import Message from "./models/message.model.js";
import MessageRoutes from "./routes/message.route.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: { origin: "http://localhost:3000", credentials: true },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

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
	socket.on("login", (userId) => {
		if (!userId) return;
		userSockets.set(String(userId), socket.id);
		socket.userId = String(userId);
		console.log(`User id ${userId} received.`);
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
			const receiverSocketId = userSockets.get(String(receiver));
			if (receiverSocketId) {
				io.to(receiverSocketId).emit("private-message", populatedData);
				console.log(`Message successfully sent to ${receiverSocketId}`);
			} else {
				console.log(`Recipient ${receiver} is offline. Message saved to DB.`);
			}
		} catch (error) {
			console.log("Error in private message:", error);
		}
	});

	//clean up maps on closing tabs
	socket.on("disconnect", () => {
		if (socket.userId) {
			userSockets.delete(String(socket.userId));
			console.log(`User ${socket.userId} cleared from registry.`);
		}
	});
});

app.use(notFound);
app.use(errorHandler);

export default server;
