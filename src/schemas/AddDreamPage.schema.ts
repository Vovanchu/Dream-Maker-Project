import { z } from "zod";
import type { person_type, format_type } from "@/types/dreams.type";

export const PERSON_TYPES = [
  "all",
  "child",
  "elderly",
  "veteran",
  "disabled",
] as const satisfies person_type[];

export const FORMAT_TYPES = [
  "all",
  "online",
  "offline",
] as const satisfies format_type[];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const MAX_IMAGES = 1;

export const DreamFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  person_type: z.enum(PERSON_TYPES),
  participation_format: z.enum(FORMAT_TYPES),
  target_budget: z.number().min(1).max(10000),
  city: z.string().min(1),
});

export type TDreamFormFields = z.infer<typeof DreamFormSchema>;
