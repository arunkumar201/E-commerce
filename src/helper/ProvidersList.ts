import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/user.model";
import bcrypt from "bcrypt";
import { connect } from "@/dbConfig";
import { disconnect } from "mongoose";

console.debug("🚀 ~ file: ProvidersList.ts:12 ~ process.env.GITHUB_ID :", process.env.GITHUB_ID );

export const authProviders = [
	GithubProvider({
		clientId: process.env.GITHUB_ID as string,
		clientSecret: process.env.GITHUB_SECRET as string,
	}),
	GoogleProvider({
		clientId: process.env.GOOGLE_ID as string,
		clientSecret: process.env.GOOGLE_SECRET as string,
	}),	
	Auth0Provider({
		clientId: process.env.AUTH0_ID as string,
		clientSecret: process.env.AUTH0_SECRET as string,
		issuer: process.env.AUTH0_ISSUER as string,
	}),
	CredentialsProvider({
		name: "Email and Password",
		credentials: {},
		authorize: async function (
			credentials: Record<string, string> | undefined
		) {
			await connect();
			const { password, email } = credentials || {};
			if (!email || !password) {
				await disconnect();
				return "Email and password fields are empty. Please try again.";
			}

			const existingUser = await User.findOne({ email });
			if (!existingUser) {
				await disconnect();
				throw new Error("Invalid credentials. Please try again.");
			}

			const passwordMatch = await bcrypt.compare(
				password,
				existingUser.password
			);

			console.debug(
				"🚀 ~ file: ProvidersList.ts:76 ~ passwordMatch:",
				passwordMatch
			);
			if (!passwordMatch) {
				await disconnect();
				throw new Error("Invalid credentials. Please try again.");
			}

			await disconnect();
			return existingUser; // Return the user object if the credentials are valid
		},
	}),
];
