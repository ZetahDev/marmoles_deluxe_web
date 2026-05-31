import { next, rewrite } from "@vercel/functions";

const studioHosts = new Set([
  "estudio.marmolesdeluxe.com",
  "studio.marmolesdeluxe.com",
]);

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (studioHosts.has(url.hostname) && url.pathname === "/") {
    url.pathname = "/estudio/";
    return rewrite(url);
  }

  return next();
}

export const config = {
  matcher: "/",
};
