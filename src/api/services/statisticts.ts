import { api } from "@/api/index";

export const getStats = async () => {
  const response = await api.get("/statistics");
  return response.data;
};
