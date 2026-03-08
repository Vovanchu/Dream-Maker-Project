import { useState } from "react";
import type { UserRole } from "../../types/user.type";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loginAs = (role: UserRole, token?: string) => {
    setRole(role);
    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ role, token, loginAs, logout }}>
      {children}
    </UserContext.Provider>
  );
};
