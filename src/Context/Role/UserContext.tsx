import { createContext } from "react";
import type { UserContextType } from "@/types/user.type";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
