import { getPostBySlug } from "@/content/posts";
import { notFound } from "next/navigation";

import {
  ClockIcon,
  CalendarDotIcon,
  TagIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Writing } from "@/types/post";
import { getAllPosts } from "@/content/posts";

type Params = Promise<{ slug: string }>;

export default async function PostPage(props: { params: Params }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (
    !post ||
    (post.frontmatter.draft && process.env.NODE_ENV !== "development")
  ) {
    notFound();
  }

  return (
    <div className="flex gap-8">
      {/* Set footnote counter to 0 for article */}
      {/* See mdx/Footnote component for more details */}
      <article
        className={`prose dark:prose-invert max-w-none w-full ${
          post.hasFootnotes
            ? `md:w-3/4
      [counter-reset:footnote-counter]`
            : "w-full"
        }`}
      >
        {process.env.NODE_ENV === "development" && post.frontmatter.draft && (
          <div className="mb-6 py-2 px-4 bg-orange-200 border-l-4 border-amber-500">
            <p className="text-black">This writing is marked as a draft.</p>
          </div>
        )}
        {process.env.NODE_ENV === "development" && post.slug[0] === "_" && (
          <div className="mb-6 py-2 px-4 bg-gray-300 border-l-4 border-gray-500">
            <p className="text-black">This writing is underscore-hidden.</p>
          </div>
        )}
        <header className="mb-8">
          <h1 className="mb-2">{post.frontmatter.title}</h1>
          <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row">
            <span>
              {<CalendarDotIcon style={{ display: "inline" }} />}
              &nbsp;
              <time dateTime={post.frontmatter.date.toISOString()}>
                {post.frontmatter.date.toISOString().split("T", 1)[0]}
              </time>
            </span>
            <span>
              {<ClockIcon style={{ display: "inline" }} />} {post.readingTime}
              -minute reading
            </span>
            <span>
              {<TagIcon style={{ display: "inline" }} />}{" "}
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </header>
        {post.content}
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const posts: Writing[] = await getAllPosts();

  if (!posts || posts.length === 0) {
    return [{ slug: "not-found" }];
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
