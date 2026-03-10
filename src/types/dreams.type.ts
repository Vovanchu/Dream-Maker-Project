import type { FormatType } from "@/components/User/Filter";

export type PersonType = "child" | "elderly" | "veteran" | "disabled";

export interface Dream {
  dream_id: string;
  owner_id: string;
  title: string;
  description: string;
  person_type: PersonType;
  participation_format: FormatType;
  target_budget: string;
  is_completed: boolean;
  created_at: string; // ISO дата
  updated_at: string; // ISO дата
}

export type DreamCatalog = Dream[];
