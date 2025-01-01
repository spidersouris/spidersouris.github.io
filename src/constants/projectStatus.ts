"use client";

import { IconBolt, IconZzz, IconCircleDashedCheck } from "@tabler/icons-react";

export const statusColors = {
  active: "bg-violet-300 text-gray-700",
  dormant: "bg-gray-100 text-gray-800",
  completed: "bg-green-200 text-green-800",
};

export const statusIcons = {
  active: IconBolt,
  dormant: IconZzz,
  completed: IconCircleDashedCheck,
};

export const statusDesc = {
  active: "Actively\nmaintained",
  dormant: "Infrequently\nmaintained",
  completed: "Completed",
};

export const statusFullDesc = {
  active: "This project is regularly updated with new features and bug fixes.",
  dormant: "This project is currently inactive and is infrequently maintained.",
  completed:
    "This project is considered achieved. No new major features are planned.",
};
