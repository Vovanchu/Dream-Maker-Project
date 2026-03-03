import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "../Context/Role/ProtectedRoute";
import { PublicRoute } from "../Context/Role/PublicRoute";

//import { HomePage } from "../pages/Home/HomePage";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Identification } from "@/pages/Auth/Identification";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <DashboardPage />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Identification />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Identification />
          </PublicRoute>
        }
      />

      {/* Захищені маршрути */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
