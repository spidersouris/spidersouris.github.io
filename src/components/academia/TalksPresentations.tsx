"use client";

import { IconPresentation, IconExternalLink } from "@tabler/icons-react";
import {
  ChatCircleDots,
  User,
  Users,
  Lectern,
  Calendar,
  MapPin,
  Info,
  Slideshow,
  Image as ImageIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Presentation } from "@/types/academia";
import { highlightMe } from "@/components/HighlightMe";
import { presentationIcons } from "@/constants/presentationsIcons";

interface TalksPresentationsProps {
  presentations: Presentation[];
  highlightedId: string;
}

export function TalksPresentations({
  presentations,
  highlightedId,
}: TalksPresentationsProps) {
  return (
    <>
      <h2 className="text-2xl font-bold">
        <ChatCircleDots size={24} className="inline relative bottom-0.5 mr-1" />{" "}
        Talks and Presentations
      </h2>
      <div className="space-y-8">
        {presentations.map((presentation, index) => {
          const PresentationIcon =
            presentationIcons[presentation.type] || IconPresentation;
          const UserIcon = presentation.authors.length > 1 ? Users : User;

          return (
            <motion.div
              id={presentation.anchorId}
              key={presentation.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                boxShadow:
                  highlightedId === presentation.anchorId
                    ? "0 0 20px 8px rgba(167, 139, 250, 0.5)"
                    : "none",
                backgroundColor:
                  highlightedId === presentation.anchorId
                    ? "rgba(167, 139, 250, 0.1)"
                    : "none",
              }}
              transition={{
                delay: index * 0.1,
                boxShadow: { duration: 0.5 },
                backgroundColor: { duration: 0.5 },
              }}
              className={`space-y-2 py-4 rounded-lg ${
                highlightedId === presentation.anchorId
                  ? "highlight-pulse pl-2.5"
                  : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <PresentationIcon size={24} className="flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">{presentation.title}</h3>
                  {presentation.english && (
                    <span className="text-gray-800 dark:text-gray-400">
                      ({presentation.english})
                    </span>
                  )}
                  <div className="text-gray-800 dark:text-gray-400">
                    <p>
                      <UserIcon
                        size={18}
                        className="inline relative bottom-0.5"
                      />{" "}
                      {highlightMe(presentation.authors)}
                    </p>{" "}
                    <p>
                      <Lectern
                        size={18}
                        className="inline relative bottom-0.5"
                      />{" "}
                      {presentation.eventName}
                    </p>{" "}
                    <p>
                      <Calendar
                        size={18}
                        className="inline relative bottom-0.5"
                      />{" "}
                      {presentation.date}
                    </p>{" "}
                    <p>
                      <MapPin
                        size={18}
                        className="inline relative bottom-0.5"
                      />{" "}
                      {presentation.location}
                    </p>{" "}
                    {presentation.info && (
                      <p>
                        <Info
                          size={18}
                          className="inline relative bottom-0.5"
                        />{" "}
                        {presentation.info}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm">
                    <Link
                      href={presentation.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-1"
                    >
                      <IconExternalLink size={18} />
                      Announcement
                    </Link>
                    <Link
                      href={presentation.material}
                      style={{
                        pointerEvents: presentation.material ? "auto" : "none",
                        color: presentation.material ? "" : "#4b5563",
                      }}
                      aria-disabled={presentation.material ? false : true}
                      tabIndex={presentation.material ? -1 : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-1"
                    >
                      {presentation.type === "talk" ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Slideshow size={18} /> Slides{" "}
                          {presentation.material ? "" : "(coming soon)"}
                        </span>
                      ) : presentation.type === "poster" ? (
                        <span className="inline-flex items-center gap-1.5">
                          <ImageIcon size={18} /> Poster{" "}
                          {presentation.material ? "" : "(coming soon)"}
                        </span>
                      ) : null}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
