module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand orange palette (used to replace green theme)
        brand: {
          50: "#e8fff3", // very light mint
          100: "#c5ffe1", // light mint
          200: "#8fffc4", // soft green
          300: "#57f2a1", // bright green
          400: "#32e289", // vivid green
          500: "#25d366", // WhatsApp primary green
          600: "#1eb85a", // deeper green
          700: "#168f46", // darker green
          800: "#0f6731", // very dark green
          900: "#0a3f1d", // almost forest green
        },
      },
      // Modern animations
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 111, 31, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(255, 111, 31, 0.8)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out",
        slideInRight: "slideInRight 0.5s ease-out",
        bounce: "bounce 2s infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      boxShadow: {
        brand: "0 20px 25px -5px rgba(255, 111, 31, 0.2)",
        "brand-lg": "0 25px 50px -12px rgba(255, 111, 31, 0.25)",
      },
    },
  },
  plugins: [],
};
