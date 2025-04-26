module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#565656', dark: '#8b9094' },
        success: { DEFAULT: '#8b9094', dark: '#b0b6bf' },
        danger: { DEFAULT: '#d01212', dark: '#de2a36' },
      },
        screens: {
          'sm': '640px', // Small screens and up
          'md': '768px', // Medium screens and up (customized)
          'lg': '1024px', // Large screens and up
          'xl': '1280px', // Extra large screens and up
          '2xl': '1536px', // 2x Extra large screens and up
          '3xl': '1600px', // 3x Extra large screens and up (new)
          '4xl': '1920px', // 4x Extra large screens and up (new)
        },
      },
    },
    plugins: [],
  }