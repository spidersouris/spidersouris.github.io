"use client";

import { AcademiaItem } from "../types/academia";
import { motion } from "framer-motion";
import { IconExternalLink, IconPresentation } from "@tabler/icons-react";
import {
  Calendar,
  MapPin,
  Slideshow,
  Image as ImageIcon,
  MicrophoneStage,
  Article,
  Lectern,
} from "@phosphor-icons/react";
import Link from "next/link";

function toTitle(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

const itemFeatures = {
  talk: {
    icon: <MicrophoneStage weight="bold" size={80} className="text-white" />,
    bg: "bg-gradient-to-bl from-neutral-800 from-0% via-sky-900 via-25% to-neutral-800 to-100%",
  },
  poster: {
    icon: <IconPresentation size={80} className="text-white" />,
    bg: "bg-gradient-to-bl from-neutral-800 from-0% via-orange-900 via-0% to-neutral-800 to-100%",
  },
  paper: {
    icon: <Article size={80} className="text-white" />,
    bg: "bg-gradient-to-bl from-purple-700 from-0% via-violet-600 via-25% to-purple-900 to-100%",
  },
};

export function AcademiaCard({ academiaItem }: { academiaItem: AcademiaItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div
        className={`flex justify-center items-center relative mt-5 h-36 w-4/5 mr-auto ml-auto rounded-lg ${
          itemFeatures[academiaItem.type].bg
        }`}
      >
        {itemFeatures[academiaItem.type].icon}
      </div>
      <div className="p-8 pt-4 space-y-4">
        <h3 className="text-xl font-bold">
          {toTitle(academiaItem.type)}: {academiaItem.title}
        </h3>
        {academiaItem.english && (
          <span className="text-gray-600 dark:text-gray-300">
            ({academiaItem.english})
          </span>
        )}
        <div className="text-gray-600 dark:text-gray-300">
          <p>
            <Lectern size={18} className="inline relative bottom-0.5" />{" "}
            {academiaItem.eventName}
          </p>
          <p>
            <Calendar size={18} className="inline relative bottom-0.5" />{" "}
            {academiaItem.date}
          </p>
          <p>
            <MapPin size={18} className="inline relative bottom-0.5" />{" "}
            {academiaItem.location}
          </p>
        </div>
        <div className="flex gap-4 text-md">
          <Link
            href={academiaItem.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline inline-flex items-center gap-1"
          >
            <IconExternalLink size={18} />
            Announcement
          </Link>
          <Link
            href={academiaItem.material}
            style={{
              pointerEvents: academiaItem.material ? "auto" : "none",
              color: academiaItem.material ? "" : "#4b5563",
            }}
            aria-disabled={academiaItem.material ? false : true}
            tabIndex={academiaItem.material ? -1 : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline inline-flex items-center gap-1"
          >
            {academiaItem.type === "talk" ? (
              <span className="inline-flex items-center gap-1.5">
                <Slideshow size={18} /> Slides{" "}
                {academiaItem.material ? "" : "(coming soon)"}
              </span>
            ) : academiaItem.type === "poster" ? (
              <span className="inline-flex items-center gap-1.5">
                <ImageIcon size={18} /> Poster{" "}
                {academiaItem.material ? "" : "(coming soon)"}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
