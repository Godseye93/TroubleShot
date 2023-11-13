import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: "#FEC04D",
        sub: "#DF2F5D",
        softmain: "#FFD17C",
        softestmain: "#FBE8C4",
        silver: "#E9EBF2",
      },
    },
    // font-SUITERegular를 사용하여 테일윈드 방식으로 폰트 변경 가능해짐
    fontFamily: {
      SUITERegular: ["SUITE-Regular"],
    },
  },
  plugins: [],
};
export default config;
