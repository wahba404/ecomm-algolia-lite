module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#3b82f6', dark: '#2563eb' },
        success: { DEFAULT: '#22c55e', dark: '#16a34a' },
        danger: { DEFAULT: '#ef4444', dark: '#dc2626' },
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