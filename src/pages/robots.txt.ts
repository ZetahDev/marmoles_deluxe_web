const siteUrl = "https://marmolesdeluxe.com";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /confirmacion-pago",
    "Disallow: /blanco-polar",
    "Disallow: /precios",
    "Disallow: /mesones-de-cocina-cali",
    "Disallow: /mesones-de-cocina-jamundi",
    "Disallow: /mesones-de-cocina-palmira",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
