import { fetchYamlData } from "@/utils/fetchData";

export async function getPresentations() {
  return fetchYamlData("presentations.yaml");
}

export async function getPapers() {
  return fetchYamlData("papers.yaml");
}

export async function getTeaching() {
  return fetchYamlData("teaching.yaml");
}
