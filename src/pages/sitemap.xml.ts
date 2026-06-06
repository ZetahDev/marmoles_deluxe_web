import { publicSiteRoutes } from "../lib/seo";

const siteUrl = "https://www.marmolesdeluxe.com";

export function GET() {
  const urls = publicSiteRoutes
    .map((route) => {
      const pathname = route === "/" ? "" : route;
      return ["<url>", `  <loc>${siteUrl}${pathname}</loc>`, "</url>"].join("\n");
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
