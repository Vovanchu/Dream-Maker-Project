// utils/formatDreams.ts
import type { Dream } from "@/types/dreams.type";

export const formatDream = (raw: any): Dream => ({
  dream_id: raw.dream_id,
  owner_id: raw.owner_id,
  is_completed: raw.is_completed,
  created_at: raw.created_at,
  updated_at: raw.updated_at,

  name: raw.owner_name || "Anonymous", // якщо в бекенді нема
  age: raw.owner_age || 0,
  city: raw.city || "Unknown",
  dreamTitle: raw.title,
  dreamDescription: raw.description,
  format: raw.participation_format as "online" | "offline",
  person_type: raw.person_type as "child" | "elderly" | "veteran" | "disabled",
  budget: parseFloat(raw.target_budget),
  image: raw.image_url || "/placeholder.png",
});
