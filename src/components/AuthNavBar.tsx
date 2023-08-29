"use client";

import { BsMoonStars } from "react-icons/bs";
import { HiSun } from "react-icons/hi";
import {MdOutlineArrowBackIosNew} from 'react-icons/md'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";

const AuthNavBar = () => {
	const { theme, setTheme } = useTheme();

	const [darkMode, setDarkMode] = useState<boolean>(() => {
		return theme === "dark";
	});
	const router = useRouter();


	const handleToggle = () => {
		setDarkMode((prevDarkMode) => {
			const newDarkMode = !prevDarkMode;
			return newDarkMode;
		});
		setTheme(theme === "dark" ? "light" : "dark");
	};
	return (
		<>
			<div className="w-full relative">
				<div className="flex w-full justify-around gap-x-12 items-center mt-6 ">
					<p className="cursor-pointer justify-center items-center" onClick={()=>router.back()}>
						<MdOutlineArrowBackIosNew size={28} className="dark:text-white text-gray-700" />
					</p>
					<h3 className="title">Auth-App</h3>
					<button
						className="relative p-1 text-center text-[#000000] dark:text-white transition-colors duration-400"
						onClick={handleToggle}
					>
						<div
							className={`transition rounded-full ease-in-out duration-500 absolute inset-0 bg-gray-600 ${
								darkMode ? "opacity-0" : "opacity-100"
							}`}
						/>
						<div
							className={`transition ease-in-out duration-500 absolute rounded-full inset-0 bg-gray-700   ${
								darkMode ? "opacity-0" : "opacity-100"
							}`}
						/>
						<div
							className={`relative z-10  ${
								darkMode ? "text-yellow-300" : "text-gray-100"
							}`}
						>
							{darkMode ? <HiSun size={40} /> : <BsMoonStars size={30} />}
						</div>
					</button>
				</div>
			</div>
		</>
	);
};

export default AuthNavBar;
