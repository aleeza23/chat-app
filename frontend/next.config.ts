import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		agentFeedback: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "img.magnific.com",
			},
		],
	},

	cacheComponents: true,
	partialPrefetching: true,
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},

	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.API_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
