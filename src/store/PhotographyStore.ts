import { create } from "zustand";
import { getPhotos } from "@/content/photos";
import { Photo } from "react-photo-album";

interface PhotographyStore {
  photos: Photo[];
  fetchPhotos: () => Promise<void>;
  isLoading: boolean;
}

export const usePhotographyStore = create<PhotographyStore>((set) => ({
  photos: [],
  fetchPhotos: async () => {
    try {
      const photos = await getPhotos();
      set({ photos, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch photos", error);
    }
  },
  isLoading: true,
}));
