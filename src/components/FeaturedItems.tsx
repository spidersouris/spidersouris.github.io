import { ProjectCard } from "@/components/ProjectCard";
import { AcademiaCard } from "@/components/AcademiaCard";
import MotionFadeIn from "@/components/MotionFadeIn";
import { getProjects } from "@/content/projects";
import { getPapers, getPresentations } from "@/content/academia";

export async function FeaturedItems() {
  const [projects, presentations, papers] = await Promise.all([
    getProjects(),
    getPresentations(),
    getPapers(),
  ]);

  const featuredProjects = projects.filter((project) => project.featured);
  const featuredAcademiaItems = [...presentations, ...papers].filter(
    (item) => item.featured
  );

  return (
    <MotionFadeIn className="space-y-6" direction="up" duration={0.5}>
      <h2 className="text-2xl font-bold">Featured</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            isFeatured={true}
            showLabel={true}
          />
        ))}
        {featuredAcademiaItems.map((academiaItem) => (
          <AcademiaCard key={academiaItem.title} academiaItem={academiaItem} />
        ))}
      </div>
    </MotionFadeIn>
  );
}
