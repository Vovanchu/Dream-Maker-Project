// contexts/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import type { JSX } from "react";

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { role } = useUser();

  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "user") return <Navigate to="/user" replace />;

  return children;
};
