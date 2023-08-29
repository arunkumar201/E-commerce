"use client";

import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
	linkType: string;
	title: string;
	btnType: string;
}

const LoginForm = (props: LoginFormProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [passwordError, setPasswordError] = useState("");
	const router = useRouter();
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const validatePassword = () => {
		if (password.length < 1) {
			setPasswordError("");
		}
		const passwordRegex =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
		if (!passwordRegex.test(password)) {
			setPasswordError(
				"Password must be at least 6 characters long, contain at least 1 special character, 1 uppercase letter, and 1 lowercase letter."
			);
		} else {
			setPasswordError("");
		}
	};
	async function loginHandler() {
		try {
			const res = await signIn("credentials", {
				callbackUrl: "/user",
				email,
				password,
			});
			console.debug("🚀 ~ file: LoginForm.tsx:51 ~ loginHandler ~ res:", res);
		} catch (error) {
			console.debug(
				"🚀 ~ file: LoginForm.tsx:57 ~ loginHandler ~ error:",
				error
			);
		}
	}

	return (
		<>
			<div className="flex justify-center items-center mt-4 w-[80%] flex-col px-4 gap-y-4">
				<div className="w-full">
					<Label htmlFor="email" className="title">
						Email
					</Label>
					<Input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Please enter email"
						className="bg-[hsla(0,0%,100%,.08)] shadow-xl  text-base font-semibold py-3 px-4 rounded-md transition-colors  w-full h-12 dark:text-gray-100 text-gray-700"
					/>
				</div>
				{props.btnType === "log in" && (
					<div className="w-full">
						<Label htmlFor="password" className="title">
							Password
						</Label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								id="password"
								placeholder="Please enter password"
								className="bg-[hsla(0,0%,100%,.08)] shadow-xl  text-base font-semibold py-3 px-4 rounded-md transition-colors  w-full h-12 dark:text-gray-100 text-gray-700"
								value={password}
								onChange={handlePasswordChange}
								onBlur={validatePassword}
							/>
							<button
								type="button"
								className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
								onClick={togglePasswordVisibility}
							>
								{showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
							</button>
						</div>
						{passwordError && (
							<p className="text-red-500 text-xs mt-1">{passwordError}</p>
						)}
					</div>
				)}
			</div>
			<div className="w-[80%] px-4 flex justify-center items-center">
				{props.btnType !== "log in" ? (
					<Link href={`/register/${email}`} className="w-full">
						<Button
							variant={"outline"}
							className="w-full mt-2 bg-[#7B6ECE] px-2 py-[25px] text-lg shadow-xl"
						>
							{props.btnType}
						</Button>
					</Link>
				) : (
					<p className="w-full" onClick={loginHandler}>
						<Button
							variant={"outline"}
							className="w-full mt-2 bg-[#7B6ECE] px-2 py-[25px] text-lg shadow-xl"
						>
							{props.btnType}
						</Button>
					</p>
				)}
			</div>

			<div className="text-sm md:text-lg">
				<h1 className="text-base title">
					{props.title}{" "}
					<Link
						href={props.linkType === "Sign up" ? "/register" : "/login"}
						className="text-[#A98EFF] hover:underline"
					>
						{props.linkType}
					</Link>
				</h1>
			</div>
		</>
	);
};

export default LoginForm;
