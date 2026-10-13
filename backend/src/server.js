import "dotenv/config";
import server from "./app.js";
import connectDB from "./config/db.js";

await connectDB();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
