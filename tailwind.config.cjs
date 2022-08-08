const defaultConfig = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultConfig.fontFamily.sans],
				mono: ["Fira Code", ...defaultConfig.fontFamily.mono],
				sartoshi: ["Sartoshi Script", ...defaultConfig.fontFamily.sans],
			}
		},
		screens: {
			// for heatmap
			'heatmap-xxs': '360px',
			'heatmap-xs': '430px',
			...defaultConfig.screens,
		},
	},

	plugins: []
};

module.exports = config;
