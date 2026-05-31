const siteUrl = "https://marmolesdeluxe.com";
const studioHosts = new Set([
  "studio.marmolesdeluxe.com",
  "estudio.marmolesdeluxe.com",
]);

export function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const origin = studioHosts.has(url.hostname) ? url.origin : siteUrl;
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /confirmacion-pago",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
