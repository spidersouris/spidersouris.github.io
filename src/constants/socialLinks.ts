"use client";

import {
  IconBrandBluesky,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import IconScholar from "../../public/icons/google-scholar.svg";

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
  {
    icon: IconScholar,
    href: "https://scholar.google.com/citations?user=pGk01S8AAAAJ",
    label: "Google Scholar",
    isLocalSvg: true,
  },
];
