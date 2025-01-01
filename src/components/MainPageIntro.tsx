"use client";

import { GraduationCap, HandWaving } from "@phosphor-icons/react";
import { RoughNotation } from "react-rough-notation";
import LinkUnderline from "@/components/misc/LinkUnderline";
import { motion } from "framer-motion";

export function MainPageIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 space-y-4"
    >
      <h1 className="text-4xl font-librebaskerville font-bold">
        <HandWaving size={52} className={"inline-block relative bottom-1"} />{" "}
        Hi! I&apos;m{" "}
        <RoughNotation
          type="underline"
          show={true}
          color="var(--accent)"
          animationDelay={500}
        >
          Enzo
        </RoughNotation>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        <GraduationCap
          size={28}
          className={"inline-block relative bottom-0.5"}
        />{" "}
        PhD Candidate in Natural Language Processing at the{" "}
        <LinkUnderline href={"https://unistra.fr/"} target="_blank">
          University of Strasbourg, France
        </LinkUnderline>
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        My research focuses on gender bias mitigation for French.
        <br />
        <LinkUnderline href="/academia">
          → Learn more about my academic work
        </LinkUnderline>
        <br />
        <br />
        I also enjoy programming and building things for fun.
        <br />
        <LinkUnderline href="/projects">
          → Have a look at my projects
        </LinkUnderline>
        <br />
        <br />I love exploring new ideas and sharing my thoughts along the way.{" "}
        <LinkUnderline href="/writings">
          Dive into my written pieces
        </LinkUnderline>
        , or{" "}
        <LinkUnderline href="/about">
          read more about my personal journey
        </LinkUnderline>
        .
      </p>
    </motion.div>
  );
}
