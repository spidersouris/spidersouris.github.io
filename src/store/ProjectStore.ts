import { create } from "zustand";
import { Project } from "../types/project";
import { getProjects } from "../server/projects";
import { ProjectStatus } from "../types/project";

interface ProjectStore {
  projects: Project[];
  activeFilters: ProjectStatus[];
  fetchProjects: () => Promise<void>;
  toggleFilter: (status: ProjectStatus) => void;
  filteredProjects: () => Project[];
  featurableProjects: () => Project[];
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  activeFilters: [],
  fetchProjects: async () => {
    const data = await getProjects();
    set({ projects: data });
  },
  toggleFilter: (status) => {
    set((state) => ({
      activeFilters: state.activeFilters.includes(status)
        ? state.activeFilters.filter((f) => f !== status)
        : [...state.activeFilters, status],
    }));
  },
  filteredProjects: () => {
    const state = get();
    return (
      state.projects
        .filter((project) =>
          state.activeFilters.length === 0
            ? true
            : state.activeFilters.includes(project.status)
        )
        // sort by number of GitHub stars
        .sort((a, b) => b.githubStats.stars - a.githubStats.stars)
    );
  },
  featurableProjects: () => {
    const state = get();
    return state.projects.filter((project) => project.featured);
  },
}));
