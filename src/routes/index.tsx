import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "../Context/Role/ProtectedRoute";
import { PublicRoute } from "../Context/Role/PublicRoute";

import { HomePage } from "../pages/Home/HomePage";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        }
      />

      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

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
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};
