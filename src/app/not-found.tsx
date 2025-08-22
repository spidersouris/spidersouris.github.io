"use client";

import { redirect, usePathname } from "next/navigation";
import Error from "next/error";

export default function NotFoundPage() {
  const path = usePathname();

  const aliases: Record<string, string> = {
    "/teaching": "/academia",
  };

  if (aliases[path]) {
    redirect(aliases[path]);
  } else {
    return <Error statusCode={404} />;
  }
}
