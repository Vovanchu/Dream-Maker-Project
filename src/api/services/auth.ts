import { api } from "@/api/index";
import type { LoginData, RegisterData } from "@/types/authData.type";

export const loginUser = (data: LoginData) => {
  const response = api.post("/auth/login", data);

  return response;
};

export const registerUser = (data: RegisterData) => {
  const response = api.post("/auth/register", data);

  return response;
};

export const getUser = () => {
  const response = api.get("/auth/me");

  return response;
};
