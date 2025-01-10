import { Icon } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HoverLabel } from "./HoverLabel";

interface CustomIconProps {
  icon: Icon;
  href?: string;
  label?: string;
  labelOffset?: number;
  hoverColorClass?: string;
  containerClassName?: string;
}

export function CustomIcon({
  icon: Icon,
  href,
  label,
  labelOffset = 4,
  hoverColorClass = "default",
  containerClassName = "",
}: CustomIconProps) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`group relative ${hoverColorClass}`}
        >
          <motion.div
            whileHover={{ y: -4 }}
            className={`relative rounded-lg pr-1
              transition-colors duration-200 ${containerClassName}`}
          >
            <Icon
              size={28}
              className="transition-colors duration-200
                text-gray-800 dark:text-gray-400"
            />
          </motion.div>
          {label && <HoverLabel label={label} labelOffset={labelOffset} />}
        </Link>
      ) : (
        <div className={`group relative ${hoverColorClass}`}>
          <motion.div
            whileHover={{ y: -4 }}
            className={`relative pr-1 rounded-lg 
              transition-colors duration-200 ${containerClassName}`}
          >
            <Icon
              size={28}
              className="transition-colors duration-200
                text-gray-800 dark:text-gray-400"
            />
          </motion.div>
          {label && <HoverLabel label={label} labelOffset={labelOffset} />}
        </div>
      )}
    </>
  );
}
