/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        // Add your custom font families here
        custom: ['dune'], // For locally hosted fonts
      },
      colors: {
        custom: '#F5EDF0',
        custom_2: '#090C02'
      },
    },
    plugins: [],
  }
}
