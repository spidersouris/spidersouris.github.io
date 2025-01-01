import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings",
  description: "A collection of my writings.",
};

export default function WritingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
