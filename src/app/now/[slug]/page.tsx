import { getPastNowPosts } from "@/content/now";
import type { NowPost } from "@/types/post";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export default async function NowPostPage(props: { params: Params }) {
  const params = await props.params;
  const posts: NowPost[] = await getPastNowPosts();

  const post = posts.find((p) => p.slug === params.slug);

  if (!post) notFound();

  return (
    <div className="container mx-auto my-8">
      <article className="prose dark:prose-invert max-w-none">
        <header className="mb-8">
          <h1>{`Past Now - ${
            post.frontmatter.date.toISOString().split("T", 1)[0]
          }`}</h1>
          <p className="text-gray-500">
            <time dateTime={post.frontmatter.date.toISOString()}>
              {post.frontmatter.date.toLocaleDateString()}
            </time>
          </p>
        </header>
        <div>{post.content}</div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const posts: NowPost[] = await getPastNowPosts();

  if (!posts || posts.length === 0) {
    return [{ slug: "not-found" }];
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
