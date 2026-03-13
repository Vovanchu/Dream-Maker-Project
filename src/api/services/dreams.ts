import { api } from "@/api/index";
import type { CreateDream } from "@/types/dreams.type";

export const getDreams = () => {
  const response = api.get("/dreams");

  return response;
};

export const createDream = (data: CreateDream) => {
  const response = api.post("/dreams", data);

  return response;
};
