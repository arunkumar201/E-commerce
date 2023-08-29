"use client"

import { FaApple, FaGithub, FaLinkedin, FaLock } from "react-icons/fa";

import AuthNavBar from "@/components/AuthNavBar";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "@/components/LoginForm";
import LogoTitle from "@/components/LogoTitle";
import OrBox from "@/components/OrBox";
import SocialProviders from "@/components/SocialProviders";

const LoginPage = () => {
	return (
		<>
			<div className="dark:bg-[#111212] bg-slate-200 flex w-full justify-center items-center h-full  ">
				<div className=" p-3 w-full md:w-[30rem] dark:bg-[#1F202A]  md:min-h-[90%] h-auto  rounded-none md:rounded-3xl bg-slate-300 mt-0 mb-2 md:mb-3 md:mt-10 shadow-neutral-300/100">
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
					<div className="all-center mt-2">
						<LoginForm
							linkType={"Sign up"}
							title={"Don’t have an account yet?"}
							btnType={"log in"}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
