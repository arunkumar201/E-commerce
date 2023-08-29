import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
	return (
		<main className="flex min-h-full flex-col items-center justify-between p-24">
			<h1>Home Page</h1>
			<div className="flex gap-4 absolute top-40">
				<Button size={"lg"}>
					<Link href="/login">Login</Link>
				</Button>
				<Button size={"lg"}>
					<Link href="/register">SignUp</Link>
				</Button>
			</div>
		</main>
	);
}
