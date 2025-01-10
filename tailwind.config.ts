import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
    "./src/constants/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            ":is(h1, h2, h3, h4, h5) a": {
              "font-weight": "inherit",
              "text-decoration": "inherit",
            },
          },
        },
      },
      fontFamily: {
        librebaskerville: ["var(--font-librebaskerville)"],
      },
      scale: {
        0.8: "0.8",
      },
    },
  },
  safelist: [
    {
      // dynamic project statusColors
      // (background and text colors)
      pattern: /^(bg|text)-\w+-\d+$/,
    },
    {
      // custom image properties for ProjectCard
      pattern: /^scale-\d+(\.\d+)?$/,
    },
    {
      // overrides Next.js default Image inset for termic ProjectCard's className
      // so that it's well aligned with custom lightBg in light mode
      pattern: /^!inset-y-\d+(\.\d+)?$/,
      variants: ["light"],
    },
  ],
  plugins: [typography],
} satisfies Config;
