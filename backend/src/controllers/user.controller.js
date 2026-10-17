import User from "../models/user.model.js";
import { setAuthCookie } from "../utils/cookie.utils.js";
import AppError from "../utils/error.utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
	const { username, email, password } = req.body;

	const uerExists = await User.findOne({ email });
	if (uerExists) {
		throw new AppError(409, "Email already exists");
	}

	// hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({ username, email, password: hashedPassword });
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	setAuthCookie(res, token);

	res.status(201).json({ success: true, data: user, token });
};

export const loginController = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		throw new AppError(404, "User not found");
	}

	const passwordMatched = await bcrypt.compare(password, user.password);
	if (!passwordMatched) {
		throw new AppError(400, "Password is wrong");
	}

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	setAuthCookie(res, token);

	res.status(200).json({
		success: true,
		data: { id: user._id, username: user.username, email: user.email },
		token,
	});
};

export const authController = (req, res) => {
	res.status(200).json({ success: true, data: req.user });
};

export const getUsersController = async (req, res) => {
	const users = await User.find({ _id: { $ne: req.user._id } });
	res.status(200).json({ success: true, data: users });
};
