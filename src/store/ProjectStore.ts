import { create } from "zustand";
import { ProjectStatus } from "../types/project";

interface ProjectFilterStore {
  activeFilters: ProjectStatus[];
  toggleFilter: (status: ProjectStatus) => void;
  clearFilters: () => void;
}

export const useProjectFilterStore = create<ProjectFilterStore>((set) => ({
  activeFilters: [],
  toggleFilter: (status) =>
    set((state) => ({
      activeFilters: state.activeFilters.includes(status)
        ? state.activeFilters.filter((f) => f !== status)
        : [...state.activeFilters, status],
    })),
  clearFilters: () => set({ activeFilters: [] }),
}));
