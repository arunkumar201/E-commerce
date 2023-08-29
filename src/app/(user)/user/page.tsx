"use client";

import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function UserPage() {
	const { data: session, status } = useSession();
	if (status === "loading") {
		return <p className="text-center">Loading...</p>;
	}
	if (status === "authenticated") {
		return (
			<>
				<div className="max-w-2xl px-4 py-8 mx-auto h-full">
					<p className="w-full p-3 mb-4 text-3xl text-center text-green-500 bg-orange-200 rounded-md">
						Signed in as {session && session.user && session?.user.email}
					</p>
					<div className="flex items-center gap-x-3">
						<Image
							className="shadow-md rounded-xl "
							src={session.user?.image as string}
							width={100}
							height={100}
							alt={session.user?.name?.charAt(0).toUpperCase() as string}
						/>
						<hr className="my-8" />
						<div>
							<h2 className="text-3xl font-bold">{session.user?.name}</h2>
							<p className="text-white">{session.user?.email}</p>
						</div>
					</div>
				</div>
			</>
		);
	}
	return (
		<>
			<div className="flex flex-col justify-center w-full h-full gap-2 mt-2 text-2xl">
				<div className="text-center ">
					<p className="mb-3 text-3xl font-extrabold text-white text-muted-foreground">
						You are not authorized to access this page
					</p>
					<Link href="/user" onClick={() => signIn()}>
						<Button variant={"secondary"} className="p-5 text-xl">
							Sign-In
						</Button>
					</Link>
				</div>
			</div>
		</>
	);
}
