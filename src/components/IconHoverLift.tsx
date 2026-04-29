"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface IconHoverLiftProps {
  children: ReactNode;
  className?: string;
}

// Client wrapper that lifts its children on hover.
// Used by `CustomIcon` (a server component) so that the parent can stay on
// the server while still getting the hover animation.
export default function IconHoverLift({
  children,
  className,
}: IconHoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative rounded-lg transition-colors duration-200 ${
        className ?? ""
      }`}
    >
      {children}
    </motion.div>
  );
}
