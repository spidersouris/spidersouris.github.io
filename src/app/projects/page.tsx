"use client";
import { useEffect } from "react";
import { useProjectStore } from "@/store/ProjectStore";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectStatus } from "@/types/project";
import {
  statusColors,
  statusIcons,
  statusFullDesc,
} from "@/constants/projectStatus";
import { PageIntro } from "@/components/PageIntro";
import { IconBrandPolymer } from "@tabler/icons-react";
import SkeletonGenericCard from "@/components/skeletons/SkeletonGenericCard";

export default function ProjectsPage() {
  const {
    activeFilters,
    fetchProjects,
    toggleFilter,
    filteredProjects,
    isLoading,
  } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="space-y-8">
      <PageIntro
        title="Projects"
        icon={IconBrandPolymer}
        blurb="A collection of various open-source programming projects I have worked on. Some were made purely for fun, while others were created for academic purposes as part of my career as a researcher, contributing to broader research endeavors."
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Filter by status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(statusIcons).map(([status, StatusIcon]) => (
            <button
              key={status}
              onClick={() => toggleFilter(status as ProjectStatus)}
              className={`flex items-center gap-3 p-4 rounded-lg bg-slate-100 dark:bg-slate-700
                ${
                  activeFilters.includes(status as ProjectStatus)
                    ? "bg-slate-300 dark:bg-zinc-900"
                    : "hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ease-in-out"
                }`}
            >
              <span
                className={`p-2 rounded-full transition-colors duration-200 ${
                  statusColors[status as ProjectStatus]
                }`}
              >
                <StatusIcon size={20} />
              </span>
              <div className="text-left">
                <h3 className="font-medium capitalize">{status}</h3>
                <p className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-line">
                  {statusFullDesc[status as ProjectStatus]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isLoading && <SkeletonGenericCard count={4} height={400} />}
        {filteredProjects().map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      {filteredProjects().length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No projects match the selected filters.
        </p>
      )}
    </div>
  );
}
