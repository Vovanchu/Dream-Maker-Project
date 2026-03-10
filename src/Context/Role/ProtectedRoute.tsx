// ProtectedRoute.tsx
import { useUser } from "@/hooks/useUser";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: ("admin" | "user")[];
  children: ReactNode; // <- змінили тип
}

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const { role } = useUser();

  if (!role) return <Navigate to="/auth/login" replace />;
  if (!allowedRoles.includes(role))
    return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};
