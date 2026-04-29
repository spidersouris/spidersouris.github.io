import { IconSchool } from "@tabler/icons-react";
import { PageIntro } from "@/components/PageIntro";
import AcademiaSectionsClient from "@/components/academia/AcademiaSectionsClient";
import {
  getPresentations,
  getPapers,
  getTeaching,
} from "@/content/academia";

export default async function AcademiaPage() {
  const [presentations, papers, teaching] = await Promise.all([
    getPresentations(),
    getPapers(),
    getTeaching(),
  ]);

  return (
    <div className="space-y-8">
      <PageIntro
        title="Academia"
        icon={IconSchool}
        blurb="An overview of my academic activities, including publications, talks, and teaching, showcasing my work at the intersection of natural language processing, digital humanities, and linguistics."
      />
      <hr className="border-t border-gray-200 dark:border-gray-700" />
      <AcademiaSectionsClient
        presentations={presentations}
        papers={papers}
        teaching={teaching}
      />
    </div>
  );
}
