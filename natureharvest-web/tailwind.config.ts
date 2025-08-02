import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
        gazpacho: ["Gazpacho", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        hurme: ["Poppins", "sans-serif"],
        geist: ["Geist", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        lilita: ["Lilita One", "cursive"],
        headline: ["Nunito", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        // Logo-inspired primary colors
        logo: {
          red: "#ee2123", // Primary red from logo outline
          black: "#000000", // Text color from logo
          green: "#1aa64f",
          sun: {
            yellow: "#FFD700", // Sun center
            green: "#2DBD30", // Sun rays
            orange: "#F7941D", // Horizon below sun
          },
          leaf: {

            dark: "#007A3D", // Left leaf
            light: "#66BB44", // Right leaf
          },
        },
        // Primary brand colors based on logo
        primary: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#E11B22", // Logo red
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        // Secondary green colors from logo
        secondary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#2DBD30", // Logo sun green
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // Logo leaf colors
        leaf: {
          dark: "#007A3D", // Dark leaf
          light: "#66BB44", // Light leaf
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#66BB44", // Light leaf as primary
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // Sun colors from logo
        sun: {
          yellow: "#FFD700", // Sun center
          green: "#2DBD30", // Sun rays
          orange: "#F7941D", // Horizon
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#FFD700", // Sun yellow
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        // Juice-specific colors (keeping for product variety)
        juice: {
          orange: "#F7941D", // Using logo orange
          apple: "#66BB44", // Using logo light leaf
          grape: "#9c27b0",
          berry: "#e91e63",
          citrus: "#FFD700", // Using logo sun yellow
          tropical: "#E11B22", // Using logo red
          mango: "#FFD700", // Sun yellow
          pineapple: "#F7941D", // Logo orange
        },
        // Natural earth tones
        natural: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        // Logo-inspired accent colors
        accent: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#FFD700", // Sun yellow
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        // Logo horizon orange
        horizon: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#F7941D", // Logo horizon orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
