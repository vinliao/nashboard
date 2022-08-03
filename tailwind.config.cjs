const defaultConfig = require('tailwindcss/defaultTheme')

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				anton: ["Anton", ...defaultConfig.fontFamily.sans],
				sans: ["Inter var", ...defaultConfig.fontFamily.sans],
			}
		}
	},

	plugins: []
};

module.exports = config;
