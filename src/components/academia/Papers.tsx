"use client";

import { motion } from "framer-motion";
import { Paper } from "@/types/academia";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import {
  Article,
  Pen,
  Slideshow,
  User,
  Users,
  Video,
  Image as ImageIcon,
  Calendar,
} from "@phosphor-icons/react";
import { highlightMe } from "@/components/HighlightMe";

interface PapersProps {
  papers: Paper[];
  highlightedId: string;
}

function PaperLabel({
  subtype,
  date,
}: {
  subtype: "conference" | "preprint" | "journal";
  date: string;
}) {
  const styles = {
    conference: "bg-blue-100 text-blue-800 border border-blue-300",
    preprint: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    journal: "bg-green-100 text-green-800 border border-green-300",
  };

  const labels = {
    conference: "conference",
    preprint: "preprint",
    journal: "journal",
  };

  return (
    <div className="flex flex-col">
      <span
        className={`min-w-[5rem] text-center mt-0.5 px-2 py-0.5 rounded text-xs font-medium ${styles[subtype]}`}
      >
        {`${labels[subtype]}`}
      </span>
      <span className="text-center font-bold text-sm mt-1.5">
        {<Calendar size={16} className="inline relative bottom-0.5" />}{" "}
        {`${date}`}
      </span>
    </div>
  );
}

export function Papers({ papers, highlightedId }: PapersProps) {
  return (
    <>
      <h2 className="text-2xl font-bold">
        <Pen size={24} className="inline relative bottom-0.5 mr-1" />{" "}
        Publications
      </h2>
      <div className="ml-1 space-y-6 border-l border-gray-600 pl-4">
        {papers.map((paper, index) => {
          const UserIcon = paper.authors.length > 1 ? Users : User;
          return (
            <motion.div
              id={paper.anchorId}
              key={paper.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                boxShadow:
                  highlightedId === paper.anchorId
                    ? "0 0 20px 8px rgba(167, 139, 250, 0.5)"
                    : "none",
                backgroundColor:
                  highlightedId === paper.anchorId
                    ? "rgba(167, 139, 250, 0.1)"
                    : "none",
              }}
              transition={{
                delay: index * 0.1,
                boxShadow: { duration: 0.5 },
                backgroundColor: { duration: 0.5 },
              }}
              className={`space-y-2 py-4 rounded-lg ${
                highlightedId === paper.anchorId ? "highlight-pulse pl-2.5" : ""
              }`}
            >
              <div className="md:flex flex-row items-start gap-4">
                {paper.subtype && (
                  <PaperLabel subtype={paper.subtype} date={paper.date} />
                )}
                <div className="md:flex flex-col gap-1">
                  <h3 className="font-bold text-lg">
                    <Link
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline md:inline-flex items-center gap-1 md:whitespace-nowrap"
                    >
                      {paper.title}{" "}
                      <IconExternalLink
                        size={16}
                        className="inline-block mb-1 md:mb-0"
                      />
                    </Link>
                  </h3>
                  {paper.eventName && (
                    <p>
                      <span className="font-medium">
                        {paper.eventName}
                        {paper.location && `: ${paper.location}`}
                      </span>
                    </p>
                  )}
                  <p className="text-gray-800 dark:text-gray-400">
                    <UserIcon
                      size={18}
                      className="inline relative bottom-0.5"
                    />{" "}
                    {highlightMe(paper.authors)}
                  </p>
                  <div className="flex md:gap-4 gap-2 text-sm">
                    {paper.material && (
                      <Link
                        href={paper.material}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline inline-flex items-center gap-1"
                      >
                        <Article size={18} />
                        Paper
                      </Link>
                    )}

                    {paper.repo && (
                      <Link
                        href={paper.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline inline-flex items-center gap-1"
                      >
                        <IconBrandGithub size={18} />
                        GitHub
                      </Link>
                    )}

                    {paper.poster && (
                      <Link
                        href={paper.poster}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline inline-flex items-center gap-1"
                      >
                        <ImageIcon size={18} />
                        Poster
                      </Link>
                    )}

                    {paper.video && (
                      <Link
                        href={paper.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline inline-flex items-center gap-1"
                      >
                        <Video size={18} />
                        Video
                      </Link>
                    )}

                    {paper.slides && (
                      <Link
                        href={paper.slides}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline inline-flex items-center gap-1"
                      >
                        <Slideshow size={18} />
                        Slides
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
