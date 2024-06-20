import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				purple_100: 'var(--purple-100)',
				purple_200: 'var(--purple-200)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(15px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-down': {
					from: { opacity: '1', transform: 'translateY(0px)' },
					to: { opacity: '0', transform: 'translateY(15px)' },
				},
				'fade-right': {
					from: { opacity: '0', transform: 'translateX(-15px)' },
					to: { opacity: '1', transform: 'translateX(0px)' },
				},
				'fade-left': {
					from: { opacity: '1', transform: 'translateX(0px)' },
					to: { opacity: '0', transform: 'translateX(-15px)', display: 'none' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 0.3s ease-in-out forwards',
				'fade-down': 'fade-down 0.3s ease-in-out',
				'fade-right': 'fade-right 0.3s ease-in-out',
				'fade-left': 'fade-left 0.3s ease-in-out forwards',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
