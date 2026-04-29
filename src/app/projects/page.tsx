import { PageIntro } from "@/components/PageIntro";
import { IconBrandPolymer } from "@tabler/icons-react";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { getProjects } from "@/content/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <PageIntro
        title="Projects"
        icon={IconBrandPolymer}
        blurb="A collection of various open-source programming projects I have worked on. Some were made purely for fun, while others were created for academic purposes as part of my career as a researcher, contributing to broader research endeavors."
      />

      <ProjectsClient projects={projects} />
    </div>
  );
}
