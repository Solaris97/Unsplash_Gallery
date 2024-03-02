/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["AppleSDGothic"],
      },
    },
  },

  /* 스크롤바를 숨기기 위한 플러그인 */
  plugins: [require("tailwind-scrollbar-hide")],
};
