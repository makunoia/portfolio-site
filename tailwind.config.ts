import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      neutral: {
        100: "var(--primitive-100)",
        200: "var(--primitive-200)",
        300: "var(--primitive-300)",
        400: "var(--primitive-400)",
        500: "var(--primitive-500)",
        600: "var(--primitive-600)",
        700: "var(--primitive-700)",
        800: "var(--primitive-800)",
        900: "var(--primitive-900)",
        1000: "var(--primitive-1000)",
        1100: "var(--primitive-1100)",
        1200: "var(--primitive-1200)",
      },
    },
    backgroundColor: {
      DEFAULT: "var(--primitive-100)",
    },
  },
  plugins: [],
};
export default config;
