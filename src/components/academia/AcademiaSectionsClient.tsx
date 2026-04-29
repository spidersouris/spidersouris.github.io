"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TalksPresentations } from "@/components/academia/TalksPresentations";
import { Teaching as TeachingSection } from "@/components/academia/Teaching";
import { Papers } from "@/components/academia/Papers";
import type {
  Presentation,
  Paper,
  Teaching as TeachingItem,
} from "@/types/academia";

interface AcademiaSectionsClientProps {
  presentations: Presentation[];
  papers: Paper[];
  teaching: TeachingItem[];
}

export default function AcademiaSectionsClient({
  presentations,
  papers,
  teaching,
}: AcademiaSectionsClientProps) {
  const [highlightedId, setHighlightedId] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash) {
        setHighlightedId(decodeURIComponent(hash));
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <motion.section
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Papers papers={papers} highlightedId={highlightedId} />
      <hr className="border-t border-gray-200 dark:border-gray-700" />
      <TalksPresentations
        presentations={presentations}
        highlightedId={highlightedId}
      />
      <hr className="border-t border-gray-200 dark:border-gray-700" />
      <TeachingSection teaching={teaching} />
    </motion.section>
  );
}
