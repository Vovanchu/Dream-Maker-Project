export type UserRole = "admin" | "user";

export interface UserContextType {
  role: UserRole | null;
  token: string | null;
  loginAs: (role: UserRole, token?: string) => void;
  logout: () => void;
}
