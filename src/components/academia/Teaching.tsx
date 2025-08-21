"use client";

import { ChalkboardTeacher } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Dot } from "../misc/Dot";
import { Teaching as TeachingType } from "@/types/academia";

interface TeachingProps {
  teaching: TeachingType[];
}

export function Teaching({ teaching }: TeachingProps) {
  return (
    <>
      <h2 className="text-2xl font-bold">
        <ChalkboardTeacher
          size={24}
          className="inline relative bottom-0.5 mr-1"
        />{" "}
        Teaching
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Institution
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Slides
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {teaching.map((item, index) => {
              const dotColor = item.fullResp === true ? "#a78bfa" : "#6ee7b7";
              return (
                <motion.tr
                  key={`${item.period}-${item.course}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="transition-colors transition-duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4 font-medium">
                    <Dot color={dotColor} /> {item.course}
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap">
                    {item.institution}
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap">
                    {item.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.slides.length > 0 ? (
                      item.slides.map((slide) => {
                        const match = slide.match(/\/(\d+\w?)_/);
                        const id = match ? match[1] : "UNK_ID";
                        return (
                          <div key={id}>
                            <a
                              href={slide}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:underline"
                            >
                              [class {id}]
                            </a>
                            <br />
                          </div>
                        );
                      })
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full flex flex-col items-end">
          <div>
            <Dot color={"#a78bfa"} /> Full Responsibility
          </div>
          <div>
            <Dot color={"#6ee7b7"} /> Partial Responsibility
          </div>
        </div>
      </div>
    </>
  );
}
