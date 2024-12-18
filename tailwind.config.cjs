module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
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