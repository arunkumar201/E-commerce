"use client";

import {} from "react-icons/bs";

import { BsMoonStars as Moon, BsFillSunFill as Sun } from "react-icons/bs";
import { MyRoutes, RoutesType } from "@/utils/routes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "./ui/button";
import Container from "./ui/container";
import Image from "next/image";
import Link from "next/link";
import { RiMenu5Line as Menu } from "react-icons/ri";
import { FiShoppingCart as ShoppingCart } from "react-icons/fi";
import logo from "./../../public/logo.png";
import { useTheme } from "next-themes";

const Navbar = () => {
	const { theme, setTheme } = useTheme();
	const routes: RoutesType[] = MyRoutes;
	const [currentBtn, setCurrentBtn] = useState<string>("Sign-In");
	const pathname = usePathname();
	const router = useRouter();
	const { status } = useSession();
	useEffect(() => {
		if (status === "authenticated") {
			setCurrentBtn("Sign-Out");
		} else {
			setCurrentBtn("Sign-In");
		}
	}, [status]);

	const buttonHandler = () => {
		if (status === "authenticated") {
			signOut({ callbackUrl: "/login" });
		} else {
			router.refresh();
			router.push("/login");
		}
	};

	return (
		<header className="sm:flex sm:justify-between py-3 px-4 border-b bg-gray-600 ">
			<Container>
				<div className="relative px-4 sm:px-6 lg:px-8 flex  h-12  items-center justify-between w-full">
					<div className="flex items-center">
						<Sheet>
							<SheetTrigger>
								<Menu className="h-6 md:hidden w-6" />
							</SheetTrigger>
							<SheetContent side="left" className="w-[300px] sm:w-[400px]">
								<nav className="flex flex-col gap-4">
									{routes.map((route: RoutesType, i: number) => (
										<Link
											key={i}
											href={route.href}
											className="block px-2 py-1 text-lg"
										>
											{route.label}
										</Link>
									))}
								</nav>
							</SheetContent>
						</Sheet>
						<div className="flex justify-center items-center">
							<Image
								src={logo}
								alt="logo"
								width={70}
								height={70}
								className="rounded-sm -mr-2"
							/>

							<Link href="/" className="ml-4 lg:ml-0">
								<h1 className="text-xl font-bold">E-Commerce</h1>
							</Link>
						</div>
					</div>
					<nav className="mx-6 flex items-center space-x-4 lg:space-x-6 sm:hidden md:block">
						{routes.map((route: RoutesType, i: number) => (
							// eslint-disable-next-line react/jsx-key
							<Button asChild variant="ghost">
								<Link
									key={i}
									href={route.href}
									className="text-sm font-medium transition-colors"
								>
									{route.label}
								</Link>
							</Button>
						))}
					</nav>
					<div className="flex items-center">
						<Button
							variant="ghost"
							size="icon"
							className="mr-2"
							aria-label="Shopping Cart"
						>
							<ShoppingCart className="h-6 w-6" />
							<span className="sr-only">Shopping Cart</span>
						</Button>
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
						{/* <ProfileButton /> */}
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Navbar;
