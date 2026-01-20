import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e0f11f',
        secondary: '#121212',
        light: '#f0f0f0',
      },
      fontFamily: {
        sans: ['Graphik', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Graphik', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['Graphik', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Graphik', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
