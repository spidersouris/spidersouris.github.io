"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface MotionFadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: Direction;
  duration?: number;
  className?: string;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: -20 },
  down: { x: 0, y: 20 },
  left: { x: -20, y: 0 },
  right: { x: 20, y: 0 },
  none: { x: 0, y: 0 },
};

// Client component that wraps children in a framer-motion fade-in.
// Used by server components that need entry animations without becoming
// client components themselves.
export default function MotionFadeIn({
  children,
  direction = "up",
  duration = 0.5,
  className,
  ...rest
}: MotionFadeInProps) {
  const { x, y } = offsets[direction];
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
