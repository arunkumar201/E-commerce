import { FaFemale, FaHome, FaLaptop, FaMale } from "react-icons/fa";

import { IconType } from "react-icons";

export interface RouteType {
	href: string;
	label: string;
	icon:  IconType;
	description: string;
}

export const MyRoutes = [
	{
		href: "/women",
		label: "Women",
		icon: FaFemale,
		description: "Explore the latest fashion trends for women",
	},
	{
		href: "/men",
		label: "Men",
		icon: FaMale,
		description: "Discover stylish clothing for men",
	},
	{
		href: "/electronics",
		label: "Electronics",
		icon: FaLaptop,
		description: "Shop for the latest gadgets and devices",
	},
	{
		href: "/home",
		label: "Home and Kitchen",
		icon: FaHome,
		description: "Find everything you need to furnish your home",
	},
];
