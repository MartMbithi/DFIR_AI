module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nav: "var(--color-nav)",
        background: "var(--color-bg)",
        card: "var(--color-card)",

        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",

        textPrimary: "var(--color-text)",
        textMuted: "var(--color-text-muted)",
        textInverse: "var(--color-text-inverse)",

        alert: "var(--color-alert)",
        success: "var(--color-success)",
      },
      fontFamily: {
        sans: ["NeueMachina", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
