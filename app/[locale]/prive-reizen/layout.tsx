import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getSeo } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { routeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const seo = getSeo(locale);
  return routeMetadata({
    locale,
    href: "/prive-reizen",
    title: seo.prive.title,
    description: seo.prive.description,
  });
}

export default function PrivateTripsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
