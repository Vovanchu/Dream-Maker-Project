import { api } from "@/api/index";
import type { CreateDream, DreamCatalog } from "@/types/dreams.type";

export const getDreams = async (): Promise<DreamCatalog> => {
  const response = await api.get<DreamCatalog>("/dreams", {
    withCredentials: true,
  });

  return response.data;
};

export const addDreamApi = (data: CreateDream) => {
  const response = api.post("/dreams", data);

  return response;
};
