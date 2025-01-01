"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function MainPageProfilePic() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-shrink-0"
    >
      <Image
        src="/images/personal_pics/brown_overcoat.jpg"
        alt="Enzo Doyen's Picture"
        width={300}
        height={300}
        className="rounded-full"
        quality={100}
        priority
      />
    </motion.div>
  );
}
