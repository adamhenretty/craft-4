const colors = require('tailwindcss/colors');

module.exports = {
	content: [
		'templates/**/*.twig'
	],
	corePlugins: {
		preflight: false,
	},
	theme: {
		screens: {
			'sm': '500px',
			'md': '858px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		fontFamily: {
			'sans': ["Roboto", "Helvetica Neue", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Arial", "Noto Sans", "sans-serif"],
			'serif': ["Georgia", "serif"],
			// these are aliased to 'body' and 'display' instead of directly edited to maintain
			// potential compat with externally-built tailwind components (eg TailwindUI). (And, for example, you wouldn't
			// always want your 'display' font to be referenced as 'serif' if it's not a serif!)
			'body': ['Roboto',"Helvetica Neue", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Arial", "Noto Sans", "sans-serif"],
			'display': ['Roboto',"Helvetica Neue", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Arial", "Noto Sans", "sans-serif"]
		},
		_vars: {
			'headingWeight': 400,
			'boldWeight': 600
		},
		extend: {
			colors: {
				gray: colors.slate,
				body: '#282828',
				brand: {
					DEFAULT: '#13598b',
					highlight: '#258ed9',
				},
				accent: {
					DEFAULT: '#688e0c',
					highlight: '#96d208'
				},
				light: {
					DEFAULT: '#F3FAFC'
				},
				dark: {
					DEFAULT: '#212121',
				}
			}
		}
	},
	plugins: [

	],
}