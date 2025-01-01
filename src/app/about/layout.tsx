import type { Metadata } from "next";
import AboutPage from "./page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Enzo Doyen, PhD Candidate in Natural Language Processing at the University of Strasbourg.",
};

export default function PageLayout() {
  return <AboutPage />;
}
