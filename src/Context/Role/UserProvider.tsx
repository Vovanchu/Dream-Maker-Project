import { useEffect, useState } from "react";
import type { UserRole } from "@/types/user.type";
import { UserContext } from "./UserContext";
import { getUser, logoutUser } from "@/api/services/auth";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const { data } = await getUser();
      setRole(data.role);
    } catch {
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async () => {
    await fetchMe();
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setRole(null);
    }
  };

  return (
    <UserContext.Provider value={{ role, login, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
