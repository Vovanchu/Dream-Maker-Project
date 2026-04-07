import { api } from "@/api/index";
import type { CreateDream, DreamCatalog } from "@/types/dreams.type";

export const getDreams = async (): Promise<DreamCatalog> => {
  const response = await api.get<DreamCatalog>("/dreams", {
    withCredentials: true,
  });

  return response.data;
};

export const uploadImageApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<{ image_url: string }>("/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return response.data;
};

export const addDreamApi = async (data: CreateDream) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("person_type", data.person_type);
  formData.append("participation_format", data.participation_format);
  formData.append("target_budget", String(data.target_budget));
  formData.append("city", data.city);
  formData.append("image_url", data.image);

  const response = await api.post<{ id: string }>("/dreams", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return response.data;
};
