import { create } from "zustand";
import { getPastNowPosts, getCurrentNow } from "@/content/now";
import type { NowPost } from "@/types/post";

interface NowStore {
  pastNows: NowPost[];
  currentNow: NowPost | null;
  fetchPastNows: () => Promise<void>;
  fetchCurrentNow: () => Promise<void>;
}

export const useNowStore = create<NowStore>((set) => ({
  pastNows: [],
  currentNow: null,
  fetchPastNows: async () => {
    try {
      const pastNows = await getPastNowPosts();
      set({ pastNows });
    } catch (error) {
      console.error("Failed to fetch past nows", error);
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
