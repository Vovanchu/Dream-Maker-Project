import { api } from "@/api/index";
import type { LoginData, RegisterData } from "@/types/authData.type";

export const loginUser = (data: LoginData) => {
  const response = api.post("/auth/login", data, {
    withCredentials: true,
  });

  return response;
};

export const registerUser = (data: RegisterData) => {
  const response = api.post("/auth/register", data);

  return response;
};

export const getUser = async () => {
  const response = await api.get("/auth/me", { withCredentials: true });

  return response;
};

export const forgotPassword = (data: { email: string }) => {
  return api.post("/auth/forgot-password", data);
};

export const resetPassword = (data: {
  token: string;
  new_password: string;
}) => {
  return api.post("/auth/reset-password", data);
};

export const logoutUser = async () => {
  const response = api.get("/auth/logout", {
    withCredentials: true,
  });

  return response;
};
