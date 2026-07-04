import type { z } from "zod";
import { CreateLinkSchema } from "./links.schema.js";

export type CreateLinkDto = z.infer<typeof CreateLinkSchema>;