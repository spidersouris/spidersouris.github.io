import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography",
  description: "A collection of my photography work.",
};

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
