import type { APIRoute } from "astro";
import { fetchAllDesignImages } from "../../lib/utils/s3Utils";

export const GET: APIRoute = async () => {
  try {
    const images = await fetchAllDesignImages();
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
