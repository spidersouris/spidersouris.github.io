import { Icon as TablerIcon } from "@tabler/icons-react";
import React from "react";
import MotionFadeIn from "./MotionFadeIn";

interface PageIntroProps {
  title: string;
  icon?: TablerIcon;
  blurb?: string | React.ReactNode;
}

export function PageIntro({ title, icon: Icon, blurb }: PageIntroProps) {
  return (
    <MotionFadeIn direction="left" duration={0.5}>
      <div className="flex items-center space-x-2">
        {Icon && (
          <Icon size={36} className="text-gray-700 dark:text-gray-300" />
        )}
        <h1 className="text-4xl font-bold m-0">{title}</h1>
      </div>
      {blurb && (
        <p className="mt-4 text-gray-800 dark:text-gray-300">{blurb}</p>
      )}
    </MotionFadeIn>
  );
}
