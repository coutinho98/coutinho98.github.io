/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FBFBFB",
        surface: "#F2F2F2",
        line: "#E4E3E0",
        ink: "#1D1C1A",
        muted: "#6E6B66",
        accent: "#7C3AED",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
}
