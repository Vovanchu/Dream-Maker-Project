export type PersonType = "all" | "child" | "elderly" | "veteran" | "disabled";
export type FormatType = "all" | "online" | "offline";

export interface Dream {
  dream_id: string;
  owner_id: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;

  name: string;
  age: number;
  city: string;
  dreamTitle: string;
  dreamDescription: string;
  format: FormatType;
  person_type: PersonType;
  budget: number;
  image: string;
}

export type DreamCatalog = Dream[];

export interface CreateDream {
  name: string;
  age: number;
  city: string;
  dreamTitle: string;
  dreamDescription: string;
  format: FormatType;
  person_type: PersonType;
  budget: number;
}
