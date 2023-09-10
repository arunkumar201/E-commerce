import { NextRequest, NextResponse } from "next/server";

import { User } from "@/models/user.model";
import bcrypt from "bcrypt";
import { connect } from "@/dbConfig";

export async function POST(req: NextRequest) {
	await connect();
	try {
		const { fullName, phoneNumber, gender, email, city, password, country } =
			await req.json();

		// Perform necessary validations
		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email and password are required" },
				{ status: 400 }
			);
		}
		// Check if the email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user instance
		const newUser = new User({
			fullName,
			phoneNumber,
			gender,
			email,
			city,
			password: hashedPassword, // Store the hashed password in the database
			country,
		});

		// Save the user to the database
		await newUser.save();

		// Return a success response
		return NextResponse.json(
			{ message: "User registered successfully" },
			{ status: 200 }
		);
	} catch (error) {
		// Handle any errors that occur during the registration process
		console.error("Error:", error);
		return NextResponse.json(
			{ error: "An error occurred during registration" },
			{ status: 500 }
		);
	}
}
