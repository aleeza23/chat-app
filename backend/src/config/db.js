import mongoose from "mongoose";

const connectDB = async () => {
	try {
		if (!process.env.MONGODB_URI) throw new Error("Mongodb URI is missing");

		await mongoose.connect(process.env.MONGODB_URI);
		console.log("DB connected");
	} catch (error) {
		console.log(`Failed to connect to DB: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
