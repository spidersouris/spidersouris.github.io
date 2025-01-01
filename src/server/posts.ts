import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Writing, PostFile } from "@/types/post";
import { YoutubeVideo } from "@/components/mdx/YoutubeVideo";
import Footnote from "@/components/mdx/Footnote";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
// @ts-expect-error - Missing types
import rehypeFigure from "@microflash/rehype-figure";
import readingTime from "reading-time";

import ImageWithModal from "@/components/ImageWithModal";

import { fetchMdxFile } from "@/utils/fetchData";

import { Pluggable } from "unified";

import remarkHasFootnotes from "@/lib/remarkHasFootnotes";

let hasFootnotes = false;

const mdxOptions = {
  components: {
    img: ImageWithModal,
    YoutubeVideo,
    Footnote,
  },
  options: {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkParse,
        // todo: find a less verbose way to define this
        () => (tree) => {
          hasFootnotes = remarkHasFootnotes()(tree);
        },
      ] as Pluggable[],
      rehypePlugins: [
        rehypeSlug,
        [rehypeExternalLinks, { rel: ["nofollow"], target: "_blank" }],
        [
          rehypeAutolinkHeadings,
          { behavior: "wrap", properties: { className: ["writings-anchor"] } },
        ],
        rehypeFigure,
        [rehypePrettyCode, { theme: "tokyo-night" }],
      ] as Pluggable[],
    },
  },
} as const;

async function getPostFile(fileName: string): Promise<PostFile | null> {
  const mdxContent = await fetchMdxFile("posts/content/" + fileName);
  if (!mdxContent) return null;

  const { data, content } = matter(mdxContent);
  const slug = fileName.replace(".mdx", "");

  return { content, data, slug };
}

function calculateReadingTime(content: string): number {
  return Math.ceil(parseFloat(readingTime(content).minutes.toFixed(2)));
}

function processFrontmatter(data: matter.GrayMatterFile<string>["data"]) {
  return {
    ...data,
    date: new Date(data.date),
  };
}

export async function getAllPosts(): Promise<Writing[]> {
  try {
    const filesResponse = await fetch(
      `https://edoyen.com/data/posts/posts.json`
      //`${process.env.NEXT_PUBLIC_BASE_URL}/data/posts/posts.json`
      //`http://localhost:3000/data/posts/posts.json`
    );
    if (!filesResponse.ok) {
      console.error("Failed to fetch list of post files");
      return [];
    }

    const files: string[] = await filesResponse.json();

    console.log(files);

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const postFile = await getPostFile(file);
          if (!postFile) return null;

          const { content, data, slug } = postFile;
          const readTime = calculateReadingTime(content);

          return {
            slug,
            frontmatter: processFrontmatter(data),
            readingTime: readTime,
          } as Writing;
        })
    );

    const filteredPosts = posts.filter((post) => {
      if (!post) return false;
      if (process.env.NODE_ENV === "development") return true;
      return !post.frontmatter.draft;
    });

    console.log("filteredPosts", filteredPosts);

    return filteredPosts.sort(
      (a, b) => b!.frontmatter.date.getTime() - a!.frontmatter.date.getTime()
    ) as Writing[];
  } catch (error) {
    console.error("Failed to get all posts", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Writing | null> {
  try {
    const postFile = await getPostFile(`${slug}.mdx`);
    if (!postFile) return null;

    const { content, data } = postFile;
    const readTime = calculateReadingTime(content);

    const { content: compiledContent } = await compileMDX({
      source: content,
      ...mdxOptions,
    });

    return {
      slug,
      frontmatter: processFrontmatter(data),
      content: compiledContent,
      readingTime: readTime,
      hasFootnotes,
    } as Writing;
  } catch (error) {
    console.error(`Failed to get post by slug: ${slug}`, error);
    return null;
  }
}
