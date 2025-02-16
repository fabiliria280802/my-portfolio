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
        primary: {
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        },
        secondary: {
          light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
          dark: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
        },
        accent: {
          light: 'rgb(var(--color-accent-light) / <alpha-value>)',
          dark: 'rgb(var(--color-accent-dark) / <alpha-value>)',
        },
        background: {
          light: 'rgb(var(--color-background-light) / <alpha-value>)',
          dark: 'rgb(var(--color-background-dark) / <alpha-value>)',
        },
        text: {
          light: 'rgb(var(--color-text-light) / <alpha-value>)',
          dark: 'rgb(var(--color-text-dark) / <alpha-value>)',
        },
      }
    },
  },
  plugins: [],
} satisfies Config;