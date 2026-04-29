import { Icon } from "@tabler/icons-react";
import { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { HoverLabel } from "./HoverLabel";
import IconHoverLift from "./IconHoverLift";

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
  const renderedIcon = (
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
    <IconHoverLift className={containerClassName}>{renderedIcon}</IconHoverLift>
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
