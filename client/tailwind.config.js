/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#6B7280",
        accent: "#F59E0B",
        background: "#F9FAFB",
        text: "#1F2937",
      },
    },
  },
  plugins: [],
};
