import { Icon } from "@tabler/icons-react";
import { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HoverLabel } from "./HoverLabel";

interface CustomIconProps {
  icon: Icon | ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
  label?: string;
  labelOffset?: number;
  hoverColorClass?: string;
  containerClassName?: string;
  size?: number;
}

export function CustomIcon({
  icon: IconComponent,
  href,
  label,
  labelOffset = 4,
  hoverColorClass = "default",
  containerClassName = "",
  size = 28,
}: CustomIconProps) {
  const IconWrapper = () => (
    <IconComponent
      width={size}
      height={size}
      className={`transition-colors duration-200 ${
        hoverColorClass == "default-local"
          ? "fill-gray-800 dark:fill-gray-400" // fill for local SVGs
          : "text-gray-800 dark:text-gray-400" // color for Tabler icons
      }`}
    />
  );

  const Content = (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative rounded-lg transition-colors duration-200 ${containerClassName}`}
    >
      <IconWrapper />
    </motion.div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`group relative ${hoverColorClass}`}
      >
        {Content}
        {label && <HoverLabel label={label} labelOffset={labelOffset} />}
      </Link>
    );
  }

  return (
    <div className={`group relative ${hoverColorClass}`}>
      {Content}
      {label && <HoverLabel label={label} labelOffset={labelOffset} />}
    </div>
  );
}
