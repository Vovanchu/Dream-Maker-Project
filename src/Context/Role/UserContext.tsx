import type { UserContextType } from "@/types/user.type";
import { createContext } from "react";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
