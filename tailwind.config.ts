import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hawker: {
          red: "#DC2626",
          cream: "#FEF3C7",
          brown: "#451A03",
          gold: "#F59E0B",
          green: "#16A34A",
        },
      },
      fontFamily: {
        mono: ["'Press Start 2P'", "monospace"],
      },
    },
  },
  plugins: [],
}

export default config
