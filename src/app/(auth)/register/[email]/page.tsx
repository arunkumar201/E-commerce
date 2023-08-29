"use client";

import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FaCity, FaFemale, FaMale } from "react-icons/fa";
import { useEffect, useState } from "react";

import AuthNavBar from "@/components/AuthNavBar";
import { Button } from "@/components/ui/button";
import { ImLocation } from "react-icons/im";
import axios from "axios";
import { connect } from "@/dbConfig";
import { connected } from "process";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface FormDataType {
	fullName: string;
	phoneNumber: string;
	email: string;
	gender: string;
	city: string;
	country: string;
	password: string;
}
const RegisterPage = ({
	params,
}: {
	params: {
		email: string;
		};
	
}) => {
	const [formData, setFormData] = useState<FormDataType>({
		fullName: "",
		phoneNumber: "",
		email: params.email,
		gender: "",
		city: "",
		country: "",
		password: "",
	});
	const router = useRouter();
	const [selectedGender, setSelectedGender] = useState("");

	const handleGenderChange = (event: any) => {
		setSelectedGender(event.target.value);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData: FormDataType) => ({
			...prevData,
			[name]: value,
		}));
	};
	const handleIconClick = (gender: string) => {
		setSelectedGender(gender);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			//await axios.post(url,data,options);
			const data = {
				...formData,
				gender:selectedGender
			}
			const response = await axios.post('/api/register',data,{
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.debug("🚀 ~ file: page.tsx:67 ~ handleSubmit ~ response:",response);	
			route.push('/')
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<div className="dark:bg-[#111212] bg-slate-200 flex w-full justify-center items-center min-h-full">
				<div className="w-full md:w-[30rem] dark:bg-[#1F202A] md:min-h-[90%] h-auto rounded-none md:rounded-3xl bg-slate-300 mt-0 md:mt-10 shadow-neutral-300/100">
					{/* Navbar for page */}
					<AuthNavBar />
					<div className="w-full mt-2 p-4">
						<h1 className="title text-center">Create An Account</h1>
						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-y-3 mt-5 w-full p-4"
						>
							<label className="text-gray-600 dark:text-gray-400">Email</label>
							<div className="relative">
								<div className="relative flex items-center">
									<div className="input-icon">
										<AiOutlineMail className="text-gray-400" />
									</div>
									<input
										type="text"
										name="email"
										value={params.email}
										disabled
										placeholder="Email"
										className="input-field "
									/>
								</div>
							</div>

							<label className="text-gray-600 dark:text-gray-400">
								Full Name
							</label>
							<div className="relative">
								<div className="relative flex items-center">
									<div className="input-icon">
										<AiOutlineUser className="text-gray-400" />
									</div>
									<input
										type="text"
										name="fullName"
										value={formData.fullName}
										onChange={handleInputChange}
										placeholder="Full Name"
										className="input-field"
									/>
								</div>
							</div>
							<label className="text-gray-600 dark:text-gray-400">
								Password
							</label>
							<div className="relative">
								<div className="relative flex items-center">
									<div className="input-icon">
										<AiOutlineUser className="text-gray-400" />
									</div>
									<input
										type="Password"
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										placeholder="Password"
										className="input-field"
									/>
								</div>
							</div>

							<label className="text-gray-600 dark:text-gray-400">
								Phone Number
							</label>
							<div className="relative">
								<div className="relative flex items-center">
									<div className="input-icon">
										<AiOutlinePhone className="text-gray-400" />
									</div>
									<input
										type="tel"
										name="phoneNumber"
										value={formData.phoneNumber}
										onChange={handleInputChange}
										placeholder="Phone Number"
										className="input-field"
									/>
								</div>
							</div>

							<div className="flex items-center gap-x-3 flex-col  w-full">
								<div className="w-full flex justify-center">
									<label className="text-gray-600 dark:text-gray-400 ">
										Gender
									</label>
									<div className="flex justify-around gap-x-3 w-full mt-6 items-start">
										<label
											className={`text-center ${
												selectedGender === "male" ? "selected" : ""
											}`}
										>
											<input
												type="radio"
												name="gender"
												value="male"
												checked={selectedGender === "male"}
												onChange={handleGenderChange}
												className="hidden"
											/>
											<div
												className={` text-center ${
													selectedGender === "male"
														? "dark:bg-green-300 bg-gray-200 p-2 rounded-md "
														: ""
												}`}
												onClick={() => handleIconClick("male")}
											>
												<FaMale className="text-gray-600 w-16 h-16" />
											</div>
											Male
										</label>
										<label
											className={`radio-label ${
												selectedGender === "female" ? "selected " : ""
											}`}
										>
											<input
												type="radio"
												name="gender"
												value="female"
												checked={selectedGender === "female"}
												onChange={handleGenderChange}
												className="hidden"
											/>
											<div
												className={`radio-button ${
													selectedGender === "female"
														? "dark:bg-green-300 bg-gray-200 p-2 rounded-md"
														: ""
												}`}
												onClick={() => handleIconClick("female")}
											>
												<FaFemale className="text-gray-600 w-16 h-16" />
											</div>
											Female
										</label>
									</div>
								</div>
								<div className="flex flex-col w-full gap-y-3">
									<label className="text-gray-600 dark:text-gray-400 mt-2">
										City
									</label>
									<div className="relative">
										<div className="input-icon">
											<FaCity className="text-gray-400" />
										</div>

										<input
											type="text"
											name="city"
											value={formData.city}
											onChange={handleInputChange}
											placeholder="City"
											className="input-field"
										/>
									</div>
								</div>
								<div className="flex flex-col w-full gap-y-3">
									<label className="text-gray-600 dark:text-gray-400 mt-2 ">
										Country
									</label>

									<div className="relative w-full">
										<div className="input-icon">
											<ImLocation className="text-gray-400" />
										</div>
										<input
											type="text"
											name="country"
											value={formData.country}
											onChange={handleInputChange}
											placeholder="Country"
											className="input-field"
										/>
									</div>
								</div>
							</div>
							{/* Add more input fields as needed */}
							<Button
								type="submit"
								disabled={
									!formData.email || !formData.fullName || !formData.phoneNumber
								}
							>
								Submit
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
