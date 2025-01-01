import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently working on and focused on",
};

export default function NowLayout({ children }: { children: React.ReactNode }) {
  return children;
}
