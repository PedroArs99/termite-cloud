/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				tch: {
					primary: '#f3f4f6',
					secondary: '#a8a29e',
					accent: '#44403c',
					neutral: '#f3f4f6',
					'base-100': '#121212',
					info: '#d8b4fe',
					success: '#bef264',
					warning: '#fdba74',
					error: '#F3816D'
				}
			}
		]
	},
	plugins: [require('daisyui')],
	theme: {
		extend: {}
	}
};
