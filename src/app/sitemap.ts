import type { MetadataRoute } from "next";
import { allRoutes } from "@/config/navigation";
import { getSiteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  return allRoutes.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/mentions") || path.startsWith("/politique") ? 0.2 : 0.8,
  }));
}
