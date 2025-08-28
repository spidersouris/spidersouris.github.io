import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import rehypeExternalLinks from "rehype-external-links";

// used to render MDX pages (e.g. "about")
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [[rehypeExternalLinks, { target: "_blank" }]],
  },
});

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.GITHUB_ACTIONS
      ? "https://wk.spidersouris.workers.dev/https://edoyen.com"
      : "http://localhost:3888",
  },
  images: {
    loader: "custom",
    loaderFile: "src/lib/imageLoader.ts",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withMDX(nextConfig);
