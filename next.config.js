/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"avatars.githubusercontent.com",
			"lh3.googleusercontent.com",
			"s.gravatar.com",
		],
	},
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig;
