module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F1419",
        slate: "#1A1F2E",
        electric: "#0080FF",
        cyan: "#00D4FF",
        light: "#E8EAED",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: ["NeueMachina", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
