/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberdark: "#0A0F1F",
        cyberblue: "#00BFFF",
        cyberlight: "#38E1FF",
      },
      boxShadow: {
        glow: "0 0 15px #00BFFF",
      },
    },
  },
  plugins: [],
}
