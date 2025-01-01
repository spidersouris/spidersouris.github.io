"use client";

import { useState, useEffect } from "react";
import { useAcademiaStore } from "@/store/AcademiaStore";
import { IconSchool } from "@tabler/icons-react";
import { PageIntro } from "@/components/PageIntro";
import { TalksPresentations } from "@/components/academia/TalksPresentations";
import { Teaching } from "@/components/academia/Teaching";
import { Papers } from "@/components/academia/Papers";
import { motion } from "framer-motion";

export default function AcademiaPage() {
  const { presentations, papers, teaching, fetchAcademia } = useAcademiaStore();
  const [highlightedId, setHighlightedId] = useState("");

  useEffect(() => {
    fetchAcademia();
  }, [fetchAcademia]);

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
    <div className="space-y-8">
      <PageIntro
        title="Academia"
        icon={IconSchool}
        blurb="An overview of my academic activities, including publications, talks, and teaching, showcasing my work at the intersection of natural language processing, digital humanities, and linguistics."
      />
      <motion.section
        className="space-y-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <TalksPresentations
          presentations={presentations}
          highlightedId={highlightedId}
        />

        {/* Finish implementation of Papers component */}
        {/* <Papers papers={papers} /> */}

        <Teaching teaching={teaching} />
      </motion.section>
    </div>
  );
}
