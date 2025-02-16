import { create } from "zustand";
import { Presentation, Paper, Teaching, AcademiaItem } from "../types/academia";
import { getPresentations, getPapers, getTeaching } from "../content/academia";

interface AcademiaStore {
  presentations: Presentation[];
  papers: Paper[];
  teaching: Teaching[];
  featurableAcademiaItems: AcademiaItem[];
  fetchAcademia: () => Promise<void>;
  isLoading: boolean;
}

export const useAcademiaStore = create<AcademiaStore>((set) => ({
  presentations: [],
  papers: [],
  teaching: [],
  featurableAcademiaItems: [],
  fetchAcademia: async () => {
    const [presentations, papers, teaching] = await Promise.all([
      getPresentations(),
      getPapers(),
      getTeaching(),
    ]);

    const featurableAcademiaItems = [...presentations, ...papers].filter(
      (item) => item.featured
    );

    set({
      presentations,
      papers,
      teaching,
      featurableAcademiaItems,
      isLoading: false,
    });
  },
  isLoading: true,
}));
