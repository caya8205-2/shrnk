import { z } from "zod";

export const CreateLinkSchema = z.object({
    url: z.url(),
    slug: z
        .string()
        .min(3)
        .max(32)
        .regex(/^[a-zA-Z0-9_-]+$/)
        .optional()
});