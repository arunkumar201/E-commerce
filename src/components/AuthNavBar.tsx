"use client";

import { BsMoonStars as Moon, BsFillSunFill as Sun } from "react-icons/bs";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const AuthNavBar = () => {
	const { theme, setTheme } = useTheme();
	const router = useRouter();

	const handleToggle = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<>
			<div className="w-full relative">
				<div className="flex w-full justify-around gap-x-12 items-center mt-6 ">
					<p
						className="cursor-pointer justify-center items-center"
						onClick={() => router.back()}
					>
						<MdOutlineArrowBackIosNew
							size={28}
							className="dark:text-white text-gray-700"
						/>
					</p>
					<h3 className="title">Auth-App</h3>
					<button
						className="relative p-1 text-center text-[#000000] dark:text-white transition-colors duration-400"
						onClick={handleToggle}
					>
						<div
							className={`transition rounded-full ease-in-out duration-500 absolute inset-0 bg-gray-600 ${
								theme ? "opacity-0" : "opacity-100"
							}`}
						/>
						<div
							className={`transition ease-in-out duration-500 absolute rounded-full inset-0 bg-gray-700   ${
								theme ? "opacity-0" : "opacity-100"
							}`}
						/>
						<Button
							variant="ghost"
							size="icon"
							aria-label="Toggle Theme"
							className="mr-6"
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						>
							<Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle Theme</span>
						</Button>
					</button>
				</div>
			</div>
		</>
	);
};

export default AuthNavBar;
