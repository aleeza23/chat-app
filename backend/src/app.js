import express, { urlencoded } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.route.js";

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

app.use(notFound);
app.use(errorHandler);
export default server;
