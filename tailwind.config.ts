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
        primary: "#000581",
        secondary: "#000581",
        accent: "#2B33FF",
        light: "#F0F0F0",
        base: "#ffffff",
        "login-bg": "#D4D9FF",
      },
      fontSize: {
        sm: "12px",
        md: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
