/** @type {import('tailwindcss').Config} */
import { radixThemePreset } from "radix-themes-tw";
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  presets: [radixThemePreset],
};
