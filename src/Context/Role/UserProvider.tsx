import { useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { UserRole } from "../../types/user.type";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [role, setRole] = useState<UserRole | null>(null);

  const loginAs = (role: UserRole) => setRole(role);
  const logout = () => setRole(null);

  return (
    <UserContext.Provider value={{ role, loginAs, logout }}>
      {children}
    </UserContext.Provider>
  );
};
