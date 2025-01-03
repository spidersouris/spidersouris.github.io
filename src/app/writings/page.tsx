"use client";

import { PostCard } from "@/components/PostCard";
import { PageIntro } from "@/components/PageIntro";
import { IconPencil } from "@tabler/icons-react";
import { useEffect } from "react";
import { usePostsStore } from "@/store/PostsStore";
import type { Writing } from "@/types/post";
import SkeletonPostCard from "@/components/skeletons/SkeletonPostCard";

export default function WritingsPage() {
  const { posts, fetchPosts, isLoading } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="space-y-8">
      <PageIntro
        title="Writings"
        icon={IconPencil}
        blurb="A eclectic mix of ideas and explorations, this section houses my writings on various topics, from broad-ranging reflections to technical deep-dives, and everything in between."
      />

      <div className="grid gap-6">
        {isLoading && <SkeletonPostCard />}
        {posts.map((post) => (
          <PostCard key={post.slug} writing={post as Writing} />
        ))}
      </div>
    </div>
  );
}
