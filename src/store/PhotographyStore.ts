import { create } from "zustand";
import { getPhotos } from "@/server/photos";
import { Photo } from "react-photo-album";

interface PhotographyStore {
  photos: Photo[];
  fetchPhotos: () => Promise<void>;
}

export const usePhotographyStore = create<PhotographyStore>((set) => ({
  photos: [],
  fetchPhotos: async () => {
    try {
      const photos = await getPhotos();
      set({ photos });
    } catch (error) {
      console.error("Failed to fetch photos", error);
    }
  },
}));
