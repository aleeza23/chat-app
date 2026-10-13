import AppError from "../utils/error.utils.js";

export const errorHandler = (err, req, res, next) => {
	if (err.name === "CastError") {
		err = new AppError(400, `Invalid: ${err.path} : ${err.value}`);
	}

	if (err.name === "ValidationError") {
		err = new AppError(
			400,
			`Validation Error: - ${Object.values(err.errors)
				.map((el) => el.message)
				.join(", ")}`,
		);
	}

	if (err.code === 11000) {
		err = new AppError(
			409,
			`Duplicate value for: ${Object.keys(err.keyValue)}. Please use another value!`,
		);
	}

	res.status(err.statusCode || 500).json({
		success: false,
		message: err.message,
		statusCode: err.statusCode,
		...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
	});
};

export const notFound = (req, res, next) => {
	next(new AppError(404, `Not Found- ${req.originalUrl}`));
};
