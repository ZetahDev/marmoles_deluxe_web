import { publicSiteRoutes } from "../lib/seo";

const siteUrl = "https://marmolesdeluxe.com";
const studioHosts = new Set([
  "studio.marmolesdeluxe.com",
  "estudio.marmolesdeluxe.com",
]);

export function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const isStudioHost = studioHosts.has(url.hostname);
  const origin = isStudioHost ? url.origin : siteUrl;
  const routes = isStudioHost ? ["/"] : publicSiteRoutes;

  const urls = routes
    .map((route) => {
      const pathname = route === "/" ? "" : route;
      return [
        "<url>",
        `  <loc>${origin}${pathname}</loc>`,
        "</url>",
      ].join("\n");
    })
    .join("\n");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
