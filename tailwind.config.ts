import { type Config } from "tailwindcss";
import { Options } from "$fresh/plugins/twind.ts";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'rgba(var(--background))',
          dark: 'rgba(var(--background-dark))',
        },
        text: {
          DEFAULT: 'rgba(var(--color-text))',
          dark: 'rgba(var(--color-text-dark))',
        }
      }
    },
  },
  plugins: [],
} satisfies Config;