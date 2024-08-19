/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: { serverComponentsExternalPackages: ['@aws-sdk'] },

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev',
				port: '',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
