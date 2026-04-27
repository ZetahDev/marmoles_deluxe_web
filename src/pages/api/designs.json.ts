import type { APIRoute } from "astro";
import cloudinaryIndex from "../../data/cloudinary-index.json";

export const GET: APIRoute = async () => {
  try {
    // Hardcoded for now as requested by user to ensure it works
    // and provide immediate control through cloudinary-index.json
    const images = (cloudinaryIndex as any).designGallery || [];

    return new Response(JSON.stringify(images), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in designs.json.ts:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
