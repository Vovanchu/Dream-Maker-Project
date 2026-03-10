import { Routes, Route } from "react-router-dom";

import { PublicRoute } from "../Context/Role/PublicRoute";

import { HomePage } from "../pages/Home/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Identification } from "@/pages/Auth/Identification";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";

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

      {AdminRoutes}

      {UserRoutes}

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
