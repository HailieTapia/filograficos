/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        blanco: '#ffffff',
        rojo: '#ff0000',
        verde: '#3cb371', // Verde trébol
        azul: '#00ffff',   // Azul eléctrico
      },
    },
  },
  plugins: [],
}
