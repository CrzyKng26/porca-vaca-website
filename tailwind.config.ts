import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New v2.3 Warm Palette
        pitch: "#0D0B0A",
        smoke: "#1C1916",
        coal: "#2E2820",
        wood: "#4A3525",
        amber: "#C97D3E",
        cream: "#F2E8D5",
        linen: "#D4C5A9",
        blood: "#8B1E1E",

        // Updated Legacy Aliases for seamless component integration
        obsidian: "#0D0B0A", // Rich warm pitch black
        charcoal: "#1C1916", // Warm smoke dark tone
        walnut: "#2E2820",   // Coal surface
        umber: "#4A3525",    // Dark wood tone
        oxblood: "#C97D3E",  // Harmonized to warm amber
        ember: "#C97D3E",    // Harmonized to warm amber
        brass: "#C97D3E",    // Warm amber-brass
        bone: "#F2E8D5",     // Golden warm cream
        paper: "#D4C5A9",    // Golden linen
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-huge": ["clamp(5rem, 15vw, 16rem)", { lineHeight: "0.85", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(3.5rem, 10vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.5rem, 7vw, 7rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(2rem, 5vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "label": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.18em" }],
        "label-lg": ["0.8125rem", { lineHeight: "1", letterSpacing: "0.15em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
      },
      letterSpacing: {
        widest: "0.25em",
        superwide: "0.35em",
      },
      transitionTimingFunction: {
        "editorial": "cubic-bezier(0.16, 1, 0.3, 1)",
        "mafia": "cubic-bezier(0.85, 0, 0.15, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        }
      },
      animation: {
        "fade-in": "fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-delayed": "fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards",
        "slide-up": "slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
        "scale-in": "scale-in 3s ease-out forwards",
      }
    },
  },
  plugins: [],
};

export default config;
