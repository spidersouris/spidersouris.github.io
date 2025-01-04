"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IconDots } from "@tabler/icons-react";

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 540);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainLinks = [
    { href: "/", label: "home" },
    { href: "/projects", label: "projects" },
    { href: "/academia", label: "academia" },
    ...(isSmallScreen ? [] : [{ href: "/writings", label: "writings" }]), // hide "writings" if small screen…
    { href: "/about", label: "about" },
  ];
  const hiddenLinks = [
    ...(isSmallScreen ? [{ href: "/writings", label: "writings" }] : []), // … and show it as hiddenLinks
    { href: "/now", label: "now" },
    { href: "/photography", label: "photography" },
    //{ href: "/localization", label: "localization" },
  ];

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-4 sm:mb-0 hover:text-[var(--accent-light)] transition-colors transition-duration-200"
      >
        <Link key={"/"} href={"/"}>
          Enzo Doyen
        </Link>
      </motion.div>

      <div className="flex items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-6"
        >
          {mainLinks.map((mainLink) => {
            const isActive = pathname === mainLink.href;
            return (
              <Link
                key={mainLink.href}
                href={mainLink.href}
                className={`text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors ${
                  isActive
                    ? "text-gray-900 dark:text-white underline underline-offset-4"
                    : ""
                }`}
              >
                {mainLink.label}
              </Link>
            );
          })}
        </motion.div>

        <div className="relative">
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
          >
            <IconDots className="w-6 h-6 relative top-0.5" />
          </motion.button>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50"
                >
                  {hiddenLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-2 text-sm hover:bg-accent/10 transition-colors ${
                          isActive
                            ? "underline underline-offset-4"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
