const withNextIntl = require("next-intl/plugin")()

module.exports = withNextIntl({
	reactStrictMode: true,
	experimental: {
		typedRoutes: true,
	},
})
