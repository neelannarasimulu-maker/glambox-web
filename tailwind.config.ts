import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: "var(--radius)",
        "2xl": "var(--radius-lg)",
        lg: "var(--radius-sm)",
      },
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        "brand-2": "rgb(var(--brand-2) / <alpha-value>)",
        "brand-3": "rgb(var(--brand-3) / <alpha-value>)",
        "brand-4": "rgb(var(--brand-4) / <alpha-value>)",
        "brand-ink": "rgb(var(--brand-ink) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.08)",
        glow: "0 0 0 1px rgba(var(--brand-2), 0.35), 0 12px 40px rgba(var(--brand), 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;
