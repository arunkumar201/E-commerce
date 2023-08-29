import mongoose, { Document } from "mongoose";

mongoose.Promise = global.Promise;
export interface IUser extends Document {
	email: string;
	password: string;
	fullName: string;
	phoneNumber?: string;
	country?: string;
	city?: string;
	gender?: string;
}

const userSchema = new mongoose.Schema<IUser>({
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
	},
	fullName: {
		type: String,
		required: [true, "Please provide a full name"],
	},
	phoneNumber: {
		type: String,
	},
	country: {
		type: String,
	},
	city: {
		type: String,
	},
	gender: {
		type: String,
	},
});

// const User = mongoose.model<IUser>("User", userSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
