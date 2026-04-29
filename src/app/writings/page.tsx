import { PostCard } from "@/components/PostCard";
import { PageIntro } from "@/components/PageIntro";
import { IconPencil } from "@tabler/icons-react";
import type { Writing } from "@/types/post";
import { getAllPosts } from "@/content/posts";

export default async function WritingsPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <PageIntro
        title="Writings"
        icon={IconPencil}
        blurb="A eclectic mix of ideas and explorations, this section houses my writings on various topics, from broad-ranging reflections to technical deep-dives, and everything in between."
      />

      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} writing={post as Writing} />
        ))}
      </div>
    </div>
  );
}
