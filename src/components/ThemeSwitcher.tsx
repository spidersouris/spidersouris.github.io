"use client";

import React from "react";
import { useTheme } from "@/utils/themeContext";
import { Sun, Moon, Desktop } from "@phosphor-icons/react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-center items-center gap-2 p-1 mt-2 rounded-lg">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-md transition-all ${
          theme === "light"
            ? "shadow-sm"
            : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
        }`}
        aria-label="Light mode"
      >
        <Sun size={20} weight={theme === "light" ? "fill" : "regular"} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-md transition-all ${
          theme === "dark"
            ? "bg-neutral-900 text-white shadow-sm"
            : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
        }`}
        aria-label="Dark mode"
      >
        <Moon size={20} weight={theme === "dark" ? "fill" : "regular"} />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-md transition-all ${
          theme === "system"
            ? "bg-neutral-200 dark:bg-neutral-700 shadow-sm"
            : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
        }`}
        aria-label="System theme"
      >
        <Desktop size={20} weight={theme === "system" ? "fill" : "regular"} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
