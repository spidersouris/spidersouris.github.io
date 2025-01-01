import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";

// Simple markdown parser for yaml content (projects, talks, etc.)
// For blog, use MDX
export async function parseMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" })
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}
