const defaultConfig = require('tailwindcss/defaultTheme')

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultConfig.fontFamily.sans],
			}
		}
	},

	plugins: []
};

module.exports = config;
