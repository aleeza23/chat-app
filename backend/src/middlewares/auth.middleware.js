import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
	const token = req.cookies.token;
	// console.log(req, "token");

	if (!token) {
		throw new AppError(401, "Unauthorized: No token provided");
	}

	// decode token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	const user = await User.findById(decoded.id);

	req.user = user;

	next();
};

export default protectRoute;
