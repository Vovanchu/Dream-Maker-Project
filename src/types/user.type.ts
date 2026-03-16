export type UserRole = "admin" | "user";

export type UserContextType = {
  role: UserRole | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};
