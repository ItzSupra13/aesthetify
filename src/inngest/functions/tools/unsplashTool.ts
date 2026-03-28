import { tool } from "ai";
import axios from "axios";
import { z } from "zod";

export const unsplashTool = tool({
  description:
    "Search for high-quality images from Unsplash. Use when an <img> image is needed in the UI.",

  inputSchema: z.object({
    query: z.string().describe("Image search query (e.g. 'modern office', 'finance dashboard')"),
    orientation: z
      .enum(["landscape", "portrait", "squarish"])
      .default("landscape"),
  }),

  execute: async ({ query, orientation }) => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query,
            orientation,
            per_page: 1,
            client_id: process.env.UNSPLASH_ACCESS_KEY,
          },
        }
      );

      return response.data.results?.[0]?.urls?.regular ?? "";
    } catch (error) {
      console.error("Unsplash error:", error);
      return "";
    }
  },
});