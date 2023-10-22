import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-bottom": {
          "0%": {
            "-webkit-transform": "translateY(-1000px)",
            transform: "translateY(-1000px)",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
        },
        "swing-top-fwd": {
          "0%": {
            "-webkit-transform": "rotateX(0)",
            transform: "rotateX(0)",
            "-webkit-transform-origin": "top",
            "transform-origin": "top",
          },
          "100%": {
            "-webkit-transform": "rotateX(180deg)",
            transform: "rotateX(180deg)",
            "-webkit-transform-origin": "top",
            "transform-origin": "top",
          },
        },
      },
      animation: {
        "slide-bottom":
          "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "swing-top-fwd":
          "swing-top-fwd 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
