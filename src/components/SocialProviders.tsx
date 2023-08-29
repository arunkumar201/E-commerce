"use client";

import { SocialProvidersProps } from "@/lib/types";
import { signIn } from "next-auth/react";

const SocialProviders = ({
	Icon,
	description,
	providerName,
}: SocialProvidersProps) => {
	return (
		<>
			<div
				className="flex justify-center items-center mt-4 w-[80%] px-4"
				onClick={() => signIn(providerName.toLowerCase(),{ callbackUrl: "/user"})}
			>
				<button className="dark:bg-[hsla(0,0%,100%,.16)] bg-gray-100 hover:dark:bg-gray-900 hover:bg-gray-200 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-md transition-colors shadow-xl w-full">
					 <Icon className="w-6 h-6 inline-block mr-2" />
					{description}
				</button>
			</div>
		</>
	);
};

export default SocialProviders;
