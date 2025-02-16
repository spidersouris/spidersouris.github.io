import { create } from "zustand";
import { getAllPosts } from "@/content/posts";
import type { Post } from "@/types/post";

interface PostsStore {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  isLoading: boolean;
}

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  fetchPosts: async () => {
    try {
      const posts = await getAllPosts();
      set({ posts, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  },
  isLoading: true,
}));
