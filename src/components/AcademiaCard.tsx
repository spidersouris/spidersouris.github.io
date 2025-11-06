"use client";

import { AcademiaItem, Paper } from "../types/academia";
import { motion } from "framer-motion";
import {
  IconBrandGithub,
  IconExternalLink,
  IconPresentation,
} from "@tabler/icons-react";
import {
  Calendar,
  MapPin,
  Slideshow,
  Image as ImageIcon,
  MicrophoneStage,
  Article,
  Lectern,
  Video,
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
      <Link
        href={{
          pathname: "/academia",
          hash: academiaItem.anchorId,
        }}
      >
        <div
          className={`flex justify-center items-center relative mt-5 h-36 w-4/5 mr-auto ml-auto rounded-lg opacity-90 hover:opacity-100 ${
            itemFeatures[academiaItem.type].bg
          }`}
        >
          {itemFeatures[academiaItem.type].icon}
        </div>
      </Link>
      <div className="p-8 pt-4 space-y-4">
        <h3 className="text-xl font-bold">
          {toTitle(academiaItem.type)} | {academiaItem.title}
        </h3>
        {academiaItem.english && (
          <span className="text-gray-800 dark:text-gray-300">
            ({academiaItem.english})
          </span>
        )}
        <div className="text-gray-800 dark:text-gray-300">
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
        <div className="flex gap-4 text-md flex-wrap">
          {academiaItem.website && (
            <Link
              href={academiaItem.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline inline-flex items-center gap-1"
            >
              <IconExternalLink size={18} />
              Announcement
            </Link>
          )}
          {academiaItem.material && (
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
              className="hover:underline inline-flex items-center gap-1"
            >
              {academiaItem.type === "talk" ? (
                <span className="inline-flex items-center gap-1.5">
                  <Slideshow size={18} /> Slides{" "}
                  {academiaItem.material ? (
                    ""
                  ) : (
                    <span>
                      {/* show only "soon" on smaller screens to avoid break */}
                      (<span className="hidden sm:inline">coming </span>soon)
                    </span>
                  )}
                </span>
              ) : academiaItem.type === "poster" ? (
                <span className="inline-flex items-center gap-1.5">
                  <ImageIcon size={18} /> Poster{" "}
                  {academiaItem.material ? (
                    ""
                  ) : (
                    <span>
                      {/* show only "soon" on smaller screens to avoid break */}
                      (<span className="hidden sm:inline">coming </span>soon)
                    </span>
                  )}
                </span>
              ) : academiaItem.type === "paper" ? (
                <span className="inline-flex items-center gap-1.5">
                  <Article size={18} /> Paper{" "}
                  {academiaItem.material ? (
                    ""
                  ) : (
                    <span>
                      {/* show only "soon" on smaller screens to avoid break */}
                      (<span className="hidden sm:inline">coming </span>soon)
                    </span>
                  )}
                </span>
              ) : null}
            </Link>
          )}
          {(academiaItem as Paper).repo && (
            <Link
              href={(academiaItem as Paper).repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline inline-flex items-center gap-1"
            >
              <IconBrandGithub size={18} />
              GitHub
            </Link>
          )}
          {(academiaItem as Paper).video && (
            <Link
              href={(academiaItem as Paper).video}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline inline-flex items-center gap-1"
            >
              <Video size={18} />
              Video
            </Link>
          )}
          {(academiaItem as Paper).slides && (
            <Link
              href={(academiaItem as Paper).slides}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline inline-flex items-center gap-1"
            >
              <Slideshow size={18} />
              Slides
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
