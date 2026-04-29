import { loadYaml } from "@/utils/loadData";
import type { Presentation, Paper, Teaching } from "@/types/academia";

export async function getPresentations() {
  return loadYaml<Presentation[]>("presentations.yaml");
}

export async function getPapers() {
  return loadYaml<Paper[]>("papers.yaml");
}

export async function getTeaching() {
  return loadYaml<Teaching[]>("teaching.yaml");
}
