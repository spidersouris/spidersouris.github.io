"use client";

import { CustomIcon } from "./CustomIcon";
import { IconBrandGithub } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="flex justify-center text-center text-gray-600 dark:text-gray-300 mt-16 border-t border-gray-200 dark:border-gray-800 pt-8">
      <p>&copy; {new Date().getFullYear()} Enzo Doyen | </p>
      <CustomIcon
        icon={IconBrandGithub}
        href="https://github.com/spidersouris/spidersouris.github.io"
        label="GitHub Repo"
        containerClassName="pl-1"
      />
    </footer>
  );
}
