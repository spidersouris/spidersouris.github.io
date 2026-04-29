import { PageIntro } from "@/components/PageIntro";
import { IconClock } from "@tabler/icons-react";
import MotionFadeIn from "@/components/MotionFadeIn";
import Link from "next/link";
import { getCurrentNow, getPastNowPosts } from "@/content/now";

export default async function NowPage() {
  const [currentNow, pastNows] = await Promise.all([
    getCurrentNow(),
    getPastNowPosts(),
  ]);

  return (
    <div className="space-y-4 prose dark:prose-invert max-w-none">
      <PageIntro
        title="Now"
        icon={IconClock}
        blurb="What currently occupies my mind."
      />

      <MotionFadeIn
        className="space-y-8 text-gray-800 dark:text-gray-300"
        direction="left"
        duration={0.7}
      >
        {currentNow?.frontmatter && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated:{" "}
            <time>
              {currentNow.frontmatter.date.toISOString().split("T", 1)[0]}
            </time>
          </p>
        )}
        {currentNow?.content}
      </MotionFadeIn>

      {pastNows.length > 0 && (
        <MotionFadeIn
          className="mt-8 space-y-8 text-gray-800 dark:text-gray-300"
          direction="left"
          duration={0.7}
        >
          <h2>Past Nows</h2>
          {pastNows.map((post) => (
            <Link
              key={post.slug}
              href={`/now/${post.slug}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg"
            >
              <time>{post.frontmatter.date.toLocaleDateString()}</time>
            </Link>
          ))}
        </MotionFadeIn>
      )}
    </div>
  );
}
