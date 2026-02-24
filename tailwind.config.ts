import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#1f2937",
            maxWidth: "65ch",
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
