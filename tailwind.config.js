/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: ["selector", ".night-theme"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        "body-text": "#334155",
        muted: "#64748B",
        accent: "#4F46E5",
        surface: "#F8FAFC",
        alabaster: "#d8dbe2",
        powder: "#a9bcd0",
        pacific: "#58a4b0",
        charcoal: "#373f51",
        carbon: "#1b1b1e",
      },
      boxShadow: {
        soft: "0 18px 40px -18px rgba(27, 27, 30, 0.35)",
        card: "0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.04)",
        elevated: "0 4px 20px -4px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};

