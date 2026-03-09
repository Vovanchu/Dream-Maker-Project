import type { FormatType } from "@/components/User/components/Filter";

export interface Dream {
  dream_id: string;
  dreamer_id: string;
  title: string;
  description: string;
  image: string; // URL
  participationFormat: FormatType;
  target_budget: number; // decimal
  isCompleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
