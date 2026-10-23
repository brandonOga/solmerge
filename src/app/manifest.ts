import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "SolMerge",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b1f3f",
    icons: [{ src: "/icon.png", sizes: "400x400", type: "image/png" }],
  };
}
