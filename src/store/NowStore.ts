import { create } from "zustand";
import { getPastNowPosts, getCurrentNow } from "@/server/now";
import type { NowPost } from "@/types/post";

interface NowStore {
  posts: NowPost[];
  currentNow: NowPost | null;
  fetchPastPosts: () => Promise<void>;
  fetchCurrentNow: () => Promise<void>;
}

export const useNowStore = create<NowStore>((set) => ({
  posts: [],
  currentNow: null,
  fetchPastPosts: async () => {
    try {
      const posts = await getPastNowPosts();
      set({ posts });
    } catch (error) {
      console.error("Failed to fetch now posts", error);
    }
  },
  fetchCurrentNow: async () => {
    try {
      const current = await getCurrentNow();
      set({ currentNow: current });
    } catch (error) {
      console.error("Failed to fetch current now", error);
    }
  },
}));
