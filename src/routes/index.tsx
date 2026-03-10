import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "../Context/Role/PublicRoute";
import NotFoundPage from "@/pages/NotFoundPage";
import { Identification } from "@/pages/Auth/Identification";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { HomeLayout } from "@/pages/Home/HomeLayout";

export const AppRoutes = () => (
  <Routes>
    {/* Публічні сторінки */}
    <Route
      path="/"
      element={
        <PublicRoute>
          <HomeLayout />
        </PublicRoute>
      }
    />
    <Route
      path="/auth/login"
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

    {/* Лейаути ролей */}
    {UserRoutes}
    {AdminRoutes}

    {/* Catch-all 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
