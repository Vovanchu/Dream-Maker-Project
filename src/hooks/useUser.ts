import { useContext } from "react";
import { UserContext } from "@/Context/Role/UserContext";
import type { UserContextType } from "@/types/user.type";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};
