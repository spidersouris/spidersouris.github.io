"use client";
import { PageIntro } from "@/components/PageIntro";
import NowContent from "/public/data/now/now.mdx";
import { useEffect, useState } from "react";
import { IconClock } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useNowStore } from "@/store/NowStore";
import Link from "next/link";

export default function NowPage() {
  const { pastNows, currentNow, fetchPastNows, fetchCurrentNow } =
    useNowStore();

  useEffect(() => {
    fetchPastNows();
    fetchCurrentNow();
  }, []);

  return (
    <div className="space-y-4 prose dark:prose-invert max-w-none">
      <PageIntro
        title="Now"
        icon={IconClock}
        blurb="What currently occupies my mind."
      />

      <motion.div
        className="space-y-8 text-gray-800 dark:text-gray-300"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        {currentNow?.frontmatter && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated:{" "}
            <time>
              {currentNow.frontmatter.date.toISOString().split("T", 1)[0]}
            </time>
          </p>
        )}
        <NowContent />
      </motion.div>
      {pastNows.length > 0 && (
        <motion.div
          className="mt-8 space-y-8 text-gray-800 dark:text-gray-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Past Nows</h2>
          {pastNows.map((post) => (
            <Link
              key={post.slug}
              href={`/now/${post.slug}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg"
            >
              <time>{post.frontmatter.date.toLocaleDateString()}</time>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
