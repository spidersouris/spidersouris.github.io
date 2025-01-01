import { Icon as TablerIcon } from "@tabler/icons-react";
import { motion } from "framer-motion";
import React from "react";

interface PageIntroProps {
  title: string;
  icon?: TablerIcon;
  blurb?: string | React.ReactNode;
}

export function PageIntro({ title, icon: Icon, blurb }: PageIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        {Icon && (
          <Icon size={36} className="text-gray-700 dark:text-gray-300" />
        )}
        <h1 className="text-4xl font-bold m-0">{title}</h1>
      </div>
      {blurb && (
        <p className="mt-4 text-gray-600 dark:text-gray-300">{blurb}</p>
      )}
    </motion.div>
  );
}
