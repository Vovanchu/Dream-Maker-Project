import { UserContext } from "@/Context/Role/UserContext";
import type { UserContextType } from "@/types/user.type";
import { useContext } from "react";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");

  return context;
};
