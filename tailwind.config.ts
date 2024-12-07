import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        slate:{
          1000: '#191A1C'
        },
        yellow:{
          1000:'#f0bb62'
        },
        gray:{
          1000:'#a3a4a7'
        }
      },
    },
  },
  plugins: [],
};
export default config;
