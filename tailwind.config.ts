import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
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
    },
  },
  // safelist for dynamic project statusColors
  safelist: [
    "bg-violet-300",
    "text-gray-700",
    "bg-gray-100",
    "text-gray-800",
    "bg-green-200",
    "text-green-800",
    "scale-0.8",
  ],
  plugins: [typography],
} satisfies Config;
