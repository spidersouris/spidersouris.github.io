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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.yaml$/,
      use: "yaml-loader",
    });
    return config;
  },
  output: "export",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.GITHUB_ACTIONS
      ? "https://arcane-eyrie-56789-59e6366cc58b.herokuapp.com/edoyen.com"
      : "http://localhost:3000",
  },
  images: {
    loader: "custom",
    loaderFile: "src/lib/imageLoader.ts",
  },
};

module.exports = withMDX(nextConfig);
