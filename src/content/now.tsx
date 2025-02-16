import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { NowPost } from "@/types/post";
import { fetchMdxFile } from "@/utils/fetchData";

export async function getCurrentNow(): Promise<NowPost | null> {
  try {
    const mdxContent = await fetchMdxFile("now/now.mdx");
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
    const fetchOptions = {
      headers: {
        "Content-Type": "application/json",
        Origin: "https://edoyen.com/",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    };
    const pastFilesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/now/pastNows/pastNows.json`,
      fetchOptions
    );
    if (!pastFilesResponse.ok) {
      console.error("Failed to fetch list of past nows");
      return [];
    }

    const files: string[] = await pastFilesResponse.json();

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const mdxContent = await fetchMdxFile(`now/pastNows/${file}`);
          if (!mdxContent) return null;

          const { data, content } = matter(mdxContent);
          const { content: compiledContent } = await compileMDX({
            source: content,
            options: { parseFrontmatter: true },
          });

          return {
            slug: data.date.toISOString().split("T", 1)[0],
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
