export type UserRole = "admin" | "user";

export interface UserContextType {
  role: UserRole | null;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}
