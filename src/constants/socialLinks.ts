"use client";

import {
  IconBrandBluesky,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export const socialLinks = [
  {
    icon: IconMail,
    href: "mailto:contact@edoyen.com",
    label: "Email",
  },
  {
    icon: IconBrandLinkedin,
    href: "https://linkedin.com/in/enzo-doyen",
    label: "LinkedIn",
    hoverColorClass: "linkedin",
  },
  {
    icon: IconBrandGithub,
    href: "https://github.com/spidersouris",
    label: "GitHub",
  },
  {
    icon: IconBrandBluesky,
    href: "https://bsky.app/profile/edoyen.com",
    label: "Bluesky",
    hoverColorClass: "bsky",
  },
];
