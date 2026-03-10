import { api } from "@/api/index";

export const getDreams = () => {
  const response = api.get("/dreams");

  return response;
};
