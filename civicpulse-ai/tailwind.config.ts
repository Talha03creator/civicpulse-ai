import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "rgba(255, 255, 255, 0.05)",
        cyan: {
          500: "#06b6d4",
        },
        purple: {
          500: "#8b5cf6",
        },
        orange: {
          500: "#f97316",
        },
        slate: {
          400: "#94a3b8",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "aurora-pulse": "aurora 10s ease infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 2s linear infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "scale(1) translate(0, 0)", opacity: "0.5" },
          "50%": { transform: "scale(1.2) translate(50px, -50px)", opacity: "0.8" },
          "100%": { transform: "scale(1) translate(-50px, 50px)", opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
