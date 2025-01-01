"use client";

import { motion } from "framer-motion";

import { PageIntro } from "@/components/PageIntro";
import AboutContent from "@/content/about.mdx";
import { IconUser } from "@tabler/icons-react";

export default function AboutPage() {
  return (
    <div className="space-y-8 prose dark:prose-invert max-w-none flex-1">
      <PageIntro title="About" icon={IconUser} />
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <AboutContent />
      </motion.section>
    </div>
  );
}
