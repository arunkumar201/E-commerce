"use client";

import { FaApple, FaGithub, FaLinkedin, FaLock } from "react-icons/fa";

import AuthNavBar from "@/components/AuthNavBar";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "@/components/LoginForm";
import LogoTitle from "@/components/LogoTitle";
import OrBox from "@/components/OrBox";
import SocialProviders from "@/components/SocialProviders";

const RegisterPage = () => {
	return (
		<>
			<div className="dark:bg-[#111212] bg-gray-400 flex w-full justify-center items-center min-h-full  ">
				<div className="w-full md:w-[30rem] dark:bg-[#1F202A]  md:min-h-[90%] h-auto   rounded-none md:rounded-3xl bg-gray-200 mt-0 md:mt-10 shadow-neutral-300/100">
					{/* Navbar for page */}
					<AuthNavBar />
					{/* Logo and title */}
					<div className="static">
						<LogoTitle title="Login Auth-App" />
					</div>
					{/* SocialProviders */}
					<div className="all-center ">
						<SocialProviders
							Icon={FcGoogle}
							description={"Login With Google"}
							providerName={"Google"}
						/>
						<SocialProviders
							Icon={FaLock}
							description={"Login With Auth0"}
							providerName={"auth0"}
						/>
						<SocialProviders
							Icon={FaGithub}
							description={"Login With Github"}
							providerName={"Github"}
						/>
					</div>
					{/* Separator  */}
					<div className="all-center mt-3 p-3">
						<OrBox />
					</div>
					{/* Form start */}
					<div className="all-center mt- mb-2">
						<LoginForm
							title={"Already have an account?"}
							linkType={"log in"}
							btnType="continue"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
