"use client";

import { motion } from "framer-motion";
import { IconFileText } from "@tabler/icons-react";
import { CustomIcon } from "@/components/CustomIcon";
import { MainPageIntro } from "@/components/MainPageIntro";
import { MainPageProfilePic } from "@/components/MainPageProfilePic";
import { FeaturedItems } from "@/components/FeaturedItems";
import { socialLinks } from "@/constants/socialLinks";

import Link from "next/link";

export default function Home() {
  // Add Person JSON-LD for SEO and rich snippets
  // https://schema.org/Person
  // Relevant NextJS doc: https://nextjs.org/docs/app/guides/json-ld
  /* prettier-ignore */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://edoyen.com/about",
    "name": "Enzo Doyen",
    "givenName": "Enzo",
    "familyName": "Doyen",
    "alternateName": "Enzo Doyen",
    "email": "contact@edoyen.com",
    "nationality": "France",
    "gender": "Male",
    "pronouns": "he/him",
    "description":
      "Enzo Doyen is a PhD Candidate in Natural Language Processing at the University of Strasbourg and English-to-French localization specialist. Enzo's research primarily focuses on mitigating gender bias in LLMs for French. As a localization specialist, Enzo has worked for major video game companies and developers, including Valve Corporation and Daniel Mullins.",
    "disambiguatingDescription": "Enzo Doyen is a PhD Candidate in Natural Language Processing at the University of Strasbourg and English-to-French localization specialist. Enzo's research primarily focuses on mitigating gender bias in LLMs for French. As a localization specialist, Enzo has worked for major video game companies and developers, including Valve Corporation and Daniel Mullins.",
    "jobTitle": "PhD Candidate in Natural Language Processing",
    "worksFor": {
      "@type": "ResearchOrganization",
      "name": "University of Strasbourg",
      "sameAs": [
        "https://en.wikipedia.org/wiki/University_of_Strasbourg",
        "https://www.unistra.fr/",
        "https://www.unistra.fr/en"
      ]
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "University of Strasbourg",
      "sameAs": [
        "https://en.wikipedia.org/wiki/University_of_Strasbourg",
        "https://www.unistra.fr/",
        "https://www.unistra.fr/en"
      ]
    },
    "affiliation": {
      "@type": "ResearchOrganization",
      "name": "University of Strasbourg",
      "sameAs": [
        "https://en.wikipedia.org/wiki/University_of_Strasbourg",
        "https://www.unistra.fr/",
        "https://www.unistra.fr/en"
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/in/enzo-doyen/",
      "https://github.com/spidersouris",
      "https://bsky.app/profile/edoyen.com",
      "https://scholar.google.com/citations?user=pGk01S8AAAAJ"
    ],
    "knowsLanguage": ["French", "English", "Spanish", "Japanese"],
    "url": "https://edoyen.com",
    "image": "https://www.edoyen.com/images/personal_pics/brown_overcoat.jpg"
  };

  return (
    <div className="space-y-8">
      {/* add JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="flex flex-col-reverse md:flex-row gap-8 items-center">
        <MainPageIntro />
        <MainPageProfilePic />
      </section>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <Link
          href="/edoyen_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-6 py-3
            rounded-lg font-medium
            text-gray-800 dark:text-gray-300
            border-2
            border-gray-600
            dark:border-accent/20
            transition-colors duration-300
            hover:bg-gray-800
            hover:text-white"
        >
          <IconFileText size={20} />
          View Resume
          <span className="absolute inset-0 rounded-lg" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center gap-6 mb-6"
      >
        {socialLinks.map((link) => (
          <CustomIcon key={link.href} {...link} />
        ))}
      </motion.div>

      <FeaturedItems />
    </div>
  );
}
