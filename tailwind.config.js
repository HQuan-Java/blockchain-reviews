/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#030414",
          900: "#060816",
          850: "#080b1f",
          800: "#0b1029",
          700: "#121634",
          600: "#1a2046",
          500: "#252c5e",
        },
        neon: {
          cyan: "#22d3ee",
          sky: "#38bdf8",
          blue: "#3b82f6",
          violet: "#8b5cf6",
          emerald: "#34d399",
          amber: "#fbbf24",
        },
      },
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        body: ['"Outfit"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 40px -8px rgba(34, 211, 238, 0.45)",
        "glow-sky": "0 0 40px -8px rgba(56, 189, 248, 0.45)",
        "glow-violet": "0 0 50px -10px rgba(139, 92, 246, 0.4)",
        "glow-amber": "0 0 40px -10px rgba(251, 191, 36, 0.4)",
        "glow-emerald": "0 0 40px -10px rgba(52, 211, 153, 0.4)",
        "card-float": "0 24px 60px -20px rgba(0, 0, 0, 0.7)",
        "inset-line": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "mesh-hero":
          "radial-gradient(60% 60% at 20% 10%, rgba(56,189,248,0.18) 0%, transparent 60%), radial-gradient(50% 50% at 85% 20%, rgba(139,92,246,0.16) 0%, transparent 55%), radial-gradient(60% 60% at 50% 100%, rgba(34,211,238,0.14) 0%, transparent 60%)",
        "grid-lines":
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-26px) translateX(10px)" },
        },
        "pulse-slow": {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "0.6", filter: "blur(40px)" },
          "50%": { opacity: "1", filter: "blur(55px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-x": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scan-line": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "border-spin": "border-spin 4s linear infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "scan-line": "scan-line 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
