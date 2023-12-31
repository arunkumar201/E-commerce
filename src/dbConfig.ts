import mongoose, { Mongoose } from "mongoose";

export async function connect() {
	try {
		mongoose.connect("mongodb://0.0.0.0:27017");
		const connection = mongoose.connection;
		connection.on("connected", () => {
			console.log("MongoDB connection established");
		});
		connection.on("error", (error:unknown) => {
			console.log("MongoDB connection error", error);
			process.exit();
		});
	} catch (error) {
		console.log("something went wrong", error);
	}
}
