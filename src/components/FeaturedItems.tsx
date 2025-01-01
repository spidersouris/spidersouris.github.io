"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { AcademiaCard } from "@/components/AcademiaCard";
import { useProjectStore } from "@/store/ProjectStore";
import { useAcademiaStore } from "@/store/AcademiaStore";
import { useEffect } from "react";

export function FeaturedItems() {
  const { featurableProjects, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const { featurableAcademiaItems, fetchAcademia } = useAcademiaStore();

  useEffect(() => {
    fetchAcademia();
  }, [fetchAcademia]);

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">Featured</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featurableProjects().map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            showStatus={false}
          />
        ))}
        {featurableAcademiaItems.map((academiaItem) => (
          <AcademiaCard key={academiaItem.title} academiaItem={academiaItem} />
        ))}
      </div>
    </motion.section>
  );
}
