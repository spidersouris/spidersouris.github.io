import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of my projects.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
