import { z } from "astro:schema";

export const shorLinkSchema = z.object({
  url: z.string().min(1, "URL is required").url("Invalid URL"),
  slug: z.string().min(1, "Slug is required"),
});
