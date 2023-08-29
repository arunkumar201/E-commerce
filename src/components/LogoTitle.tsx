import Image from "next/image";
import logo from "./../../public/logo.png";

interface Props {
	title: string;
}

const LogoTitle = ({ title = "Login Auth-App" }: Props) => {
	return (
		<div className="w-full relative flex flex-col items-center justify-center mt-12 text-center">
			<Image src={logo} alt="Logo" width={300} height={300} quality={60} />
			<h3 className="title">
				{title}
			</h3>
		</div>
	);
};

export default LogoTitle;
