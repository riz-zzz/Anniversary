import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F3EA",
        blush: "#E8C9C4",
        rose: "#B77C83",
        sage: "#A6AD96",
        brown: "#493A35",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 30px -12px rgba(73, 58, 53, 0.35)",
        card: "0 4px 20px -8px rgba(73, 58, 53, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
