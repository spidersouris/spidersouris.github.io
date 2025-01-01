import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academia",
  description: "Publications, talks, and teaching experience",
};

export default function AcademiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
