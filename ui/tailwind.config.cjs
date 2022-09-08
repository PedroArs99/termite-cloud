/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui : {
    themes: ["forest"]
  },
  plugins: [
    require("daisyui")
  ],
  theme: {
    extend: {},
  },
}
