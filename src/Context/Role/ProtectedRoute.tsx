// ProtectedRoute.tsx
import { useUser } from "@/hooks/useUser";
import { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: ("admin" | "user")[];
  children: JSX.Element;
}

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const { role } = useUser();

  if (!role) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role))
    return <Navigate to="/unauthorized" replace />;

  return children;
};
