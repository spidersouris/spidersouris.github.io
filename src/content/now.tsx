import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { NowPost } from "@/types/post";
import { loadDataFile, loadJson } from "@/utils/loadData";

export async function getCurrentNow(): Promise<NowPost | null> {
  try {
    const mdxContent = await loadDataFile("now/now.mdx");
    if (!mdxContent) return null;

    const { data, content } = matter(mdxContent);
    const { content: compiledContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: true },
    });

    return {
      slug: "current",
      frontmatter: {
        date: new Date(data.date),
      },
      content: compiledContent,
    };
  } catch (error) {
    console.error("Failed to get current now", error);
    return null;
  }
}

export async function getPastNowPosts(): Promise<NowPost[]> {
  try {
    const files = await loadJson<string[]>("now/pastNows/pastNows.json");
    if (!files) {
      console.error("Failed to load list of past nows");
      return [];
    }

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const mdxContent = await loadDataFile(`now/pastNows/${file}`);
          if (!mdxContent) return null;

          const { data, content } = matter(mdxContent);
          const { content: compiledContent } = await compileMDX({
            source: content,
            options: { parseFrontmatter: true },
          });

          return {
            slug: new Date(data.date).toISOString().split("T", 1)[0],
            frontmatter: {
              ...data,
              date: new Date(data.date),
            },
            content: compiledContent,
          };
        })
    );

    return posts
      .filter(Boolean)
      .sort(
        (a, b) => b!.frontmatter.date.getTime() - a!.frontmatter.date.getTime()
      ) as NowPost[];
  } catch (error) {
    console.error("Failed to get past now posts", error);
    return [];
  }
}
