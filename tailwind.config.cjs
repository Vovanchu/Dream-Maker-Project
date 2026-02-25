/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // всі твої компоненти
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"), // потрібен для Shadcn UI
  ],
};
