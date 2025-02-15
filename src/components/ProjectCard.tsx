"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/types/project";
import {
  IconAppWindow,
  IconBrandGithub,
  IconStack,
  IconStar,
  IconTag,
} from "@tabler/icons-react";
import { CustomIcon } from "./CustomIcon";
import { HoverLabel } from "./HoverLabel";
import Link from "next/link";
import {
  statusColors,
  statusIcons,
  statusDesc,
} from "@/constants/projectStatus";

export function ProjectCard({
  project,
  isFeatured = false,
  showLabel = false,
}: {
  project: Project;
  isFeatured?: boolean;
  showLabel?: boolean;
}) {
  const StatusIcon = statusIcons[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div
        className={`relative h-36 dark:mt-5 dark:bg-inherit ${
          project.image.lightBg ? "bg-gray-900" : ""
        }
        
        ${isFeatured ? "mt-5" : "mt-0"}`}
        // When project is featured,
        // set margin-top to 5 in light mode as well
        // to align with margin of a featured AcademiaItem.
        // Otherwise, set margin-top to 0 in light mode, because creates ugly background separation effect otherwise (for instance on "Projects" page).
      >
        <Link
          href={project.links.demo ? project.links.demo : project.links.github!}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={project.image.url}
            alt={project.name}
            fill
            className={`object-contain opacity-90 hover:opacity-100 ${project.image.className}`}
          />
        </Link>
      </div>
      <div className="p-8 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            {showLabel ? "Project: " : ""}
            {project.name}
          </h3>
          {/* don't show status on featured card */}
          {!isFeatured && (
            <div className="group relative">
              <span
                className={`flex px-2 py-1 rounded-full text-sm ${
                  statusColors[project.status]
                }`}
              >
                <StatusIcon />
              </span>
              <HoverLabel label={statusDesc[project.status]} labelOffset={4} />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <IconStack size={24} className="relative top-0.5" />
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="pt-2 min-h-20">
          <span
            className="text-gray-800 dark:text-gray-300 hover-underline"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>
        <div className="flex flex-wrap gap-2 pb-2">
          <IconTag size={24} className="relative top-0.5" />
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <hr className="border-gray-200 dark:border-gray-800" />
        <div className="flex gap-6">
          <div className="flex">
            {project.links.github && (
              <CustomIcon
                icon={IconBrandGithub}
                href={project.links.github}
                label={"GitHub Repo"}
                labelOffset={2}
                containerClassName="pr-2"
              />
            )}
            {project.githubStats.stars !== undefined &&
              project.githubStats.stars > 0 && (
                <span style={{ display: "flex", alignItems: "center" }}>
                  (
                  <IconStar
                    size={18}
                    style={{ marginRight: "5px" }}
                    className="relative top-0.5"
                  />{" "}
                  {project.githubStats.stars})
                </span>
              )}
          </div>
          {project.links.demo && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CustomIcon
                icon={IconAppWindow}
                href={project.links.demo}
                label={"Demo"}
                labelOffset={2}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
