module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* ===== Core Brand ===== */
        nav: "#0A0E27", // Primary navigation background
        primary: "#4B7BFF", // Primary CTA / links
        primaryHover: "#3A66E5",

        /* ===== Surfaces ===== */
        card: "#1D2438", // Cards / panels
        background: "#0A0E27", // App background

        /* ===== Semantic ===== */
        alert: "#B84C3C", // Alerts / critical
        success: "#2EAD6A", // Success / safe

        /* ===== Text ===== */
        textPrimary: "#F5F6F8", // Text on dark
        textInverse: "#0A0E27", // Text on light
      },
      fontFamily: {
        sans: ["NeueMachina", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
