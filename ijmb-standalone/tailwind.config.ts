import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        serif:    ["Playfair Display", "Georgia", "serif"],
        sans:     ["DM Sans", "system-ui", "sans-serif"],
        display:  ["Cormorant Garamond", "Georgia", "serif"],
        mono:     ["Space Mono", "monospace"],
      },
      colors: {
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold:   { DEFAULT: "hsl(var(--gold))", light: "hsl(var(--gold-light))" },
        bronze: "hsl(var(--bronze))",
        sand:   "hsl(var(--sand))",
        "dept-green":  "#1A6338",
        "dept-orange": "#C4501A",
        "dept-blue":   "#102060",
        "dept-bronze": "#8B5E3C",
        "dept-purple": "#4A1D96",
        surface: {
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-up":        { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-in":        { from: { opacity: "0" }, to: { opacity: "1" } },
        "gold-pulse": {
          "0%, 100%": { boxShadow: "0 0 30px -8px hsl(43 80% 50% / 0.4)" },
          "50%":       { boxShadow: "0 0 60px -8px hsl(43 80% 50% / 0.7)" },
        },
        shimmer: { from: { backgroundPosition: "-200% center" }, to: { backgroundPosition: "200% center" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.6s ease-out forwards",
        "fade-in":        "fade-in 0.5s ease-out forwards",
        "gold-pulse":     "gold-pulse 3s ease-in-out infinite",
        shimmer:          "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, hsl(43 80% 50%), hsl(43 80% 65%))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
