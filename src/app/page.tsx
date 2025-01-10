"use client";

import { motion } from "framer-motion";
import { IconFileText } from "@tabler/icons-react";
import { CustomIcon } from "@/components/CustomIcon";
import { MainPageIntro } from "@/components/MainPageIntro";
import { MainPageProfilePic } from "@/components/MainPageProfilePic";
import { FeaturedItems } from "@/components/FeaturedItems";
import { socialLinks } from "@/constants/socialLinks";

import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col-reverse md:flex-row gap-8 items-center">
        <MainPageIntro />
        <MainPageProfilePic />
      </section>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <Link
          href="/edoyen_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-6 py-3
            rounded-lg font-medium
            text-gray-800 dark:text-gray-300
            border-2
            border-gray-600
            dark:border-accent/20
            transition-colors duration-300
            hover:bg-gray-800
            hover:text-white"
        >
          <IconFileText size={20} />
          View Resume
          <span className="absolute inset-0 rounded-lg" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center gap-6 mb-6"
      >
        {socialLinks.map((link) => (
          <CustomIcon key={link.href} {...link} />
        ))}
      </motion.div>

      <FeaturedItems />
    </div>
  );
}
