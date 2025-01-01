"use client";

import { motion } from "framer-motion";
import { Paper } from "@/types/academia";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

interface PapersProps {
  papers: Paper[];
}

export function Papers({ papers }: PapersProps) {
  return (
    <>
      <h2 className="text-2xl font-bold">Publications</h2>
      <div className="space-y-8">
        {papers.map((paper, index) => (
          <motion.div
            key={paper.doi}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <h3 className="font-bold text-lg">{paper.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{paper.authors}</p>
            <p>
              <span className="font-medium">{paper.eventName}</span> (
              {paper.date})
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline inline-flex items-center gap-1"
              >
                <IconExternalLink size={16} />
                DOI
              </Link>
              <span className="text-gray-600 dark:text-gray-400">
                Citations: {paper.citations}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
