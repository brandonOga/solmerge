import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// A single-page site: the sections are anchors on the home page, which search
// engines don't index separately, so there's one entry. Add new routes here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
