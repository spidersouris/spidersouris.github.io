import { create } from "zustand";
import { getAllPosts } from "@/server/posts";
import type { Post } from "@/types/post";

interface PostsStore {
  posts: Post[];
  fetchPosts: () => Promise<void>;
}

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  fetchPosts: async () => {
    try {
      const posts = await getAllPosts();
      set({ posts });
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  },
}));
