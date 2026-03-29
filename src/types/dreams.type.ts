export type person_type = "all" | "child" | "elderly" | "veteran" | "disabled";
export type format_type = "all" | "online" | "offline";

export interface Dream {
  dream_id: string;
  owner_id: string;
  title: string;
  description: string;
  person_type: person_type;
  participation_format: format_type;
  target_budget: number;
  city: string;
  image_url: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export type DreamCatalog = Dream[];

export interface CreateDream {
  title: string;
  description: string;
  person_type: person_type;
  participation_format: format_type;
  target_budget: number;
  city: string;
  image_url: string;
}
