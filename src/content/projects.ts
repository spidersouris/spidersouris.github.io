import { parseMarkdown } from "@/utils/parseMarkdown";
import type { Project } from "@/types/project";
import { fetchYamlData } from "@/utils/fetchData";

export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = await fetchYamlData("projects.yaml");

  return Promise.all(
    projects.map(async (project) => ({
      ...project,
      description: await parseMarkdown(project.description),
    }))
  );
}
