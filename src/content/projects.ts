import { parseMarkdown } from "@/utils/parseMarkdown";
import type { Project } from "@/types/project";
import { loadYaml } from "@/utils/loadData";

export async function getProjects(): Promise<Project[]> {
  const projects = await loadYaml<Project[]>("projects.yaml");

  return Promise.all(
    projects.map(async (project) => ({
      ...project,
      description: await parseMarkdown(project.description),
    }))
  );
}
