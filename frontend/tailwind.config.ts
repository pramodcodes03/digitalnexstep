import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0ecf9",
          100: "#d9d0f0",
          200: "#b3a1e1",
          300: "#8d72d2",
          400: "#6743c3",
          500: "#4a2a9e",
          600: "#3a1f85",
          700: "#28166f",
          800: "#1e1058",
          900: "#140b3d",
        },
        secondary: {
          50: "#fdeeed",
          100: "#f9ccc9",
          200: "#f09a95",
          300: "#e66861",
          400: "#d43327",
          500: "#b82b21",
          600: "#9c231b",
          700: "#801c15",
          800: "#64150f",
          900: "#480e09",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(40, 22, 111, 0.2)",
        "glow-lg": "0 0 40px rgba(40, 22, 111, 0.25)",
        soft: "0 2px 15px rgba(0, 0, 0, 0.08)",
        strong: "0 10px 40px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(40, 22, 111, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(40, 22, 111, 0.35)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
