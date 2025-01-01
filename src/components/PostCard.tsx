"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Writing } from "@/types/post";

import { Clock, CalendarDot, Tag } from "@phosphor-icons/react";

export function PostCard({ writing }: { writing: Writing }) {
  return (
    <Link href={`/writings/${writing.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 rounded-lg border hover:border-accent transition-colors"
      >
        <h2 className="text-xl font-bold mb-2">{writing.frontmatter.title}</h2>
        {process.env.NODE_ENV === "development" &&
          writing.frontmatter.draft && (
            <span className="absolute top-5 right-5 px-2 py-1 text-sm font-medium text-white bg-amber-700 rounded">
              Draft
            </span>
          )}
        {process.env.NODE_ENV === "development" && writing.slug[0] === "_" && (
          <span className="absolute top-15 right-5 px-2 py-1 text-sm font-medium text-white bg-gray-700 rounded">
            Underscore-hidden
          </span>
        )}
        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>
            <CalendarDot style={{ display: "inline" }} />
            &nbsp;
            <time dateTime={writing.frontmatter.date.toISOString()}>
              {writing.frontmatter.date.toISOString().split("T", 1)[0]}
            </time>
          </span>
          <span>
            <Clock style={{ display: "inline" }} />
            &nbsp;{writing.readingTime}-minute reading
          </span>
        </div>
        {writing.frontmatter.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Tag size={20} className="inline relative top-1" />
            {writing.frontmatter.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-1">
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.article>
    </Link>
  );
}
