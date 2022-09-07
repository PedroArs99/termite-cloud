/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui : {
    themes: ["black"]
  },
  plugins: [
    require("daisyui")
  ],
  theme: {
    extend: {},
  },
}
