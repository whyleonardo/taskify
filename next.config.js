const withNextIntl = require("next-intl/plugin")()

module.exports = withNextIntl({
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.clerk.com",
			},
		],
	},
	experimental: {
		typedRoutes: true,
	},
})
