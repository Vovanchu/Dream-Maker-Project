import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "../Context/Role/PublicRoute";
import NotFoundPage from "@/pages/NotFoundPage";
import { Identification } from "@/pages/Auth/Identification";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { HomeLayout } from "@/pages/Home/HomeLayout";
import { ForgotPasswordPage } from "@/pages/Auth/ForgotPassword";
import { ResetPasswordPage } from "@/pages/Auth/ResetPasswrod";
import { GoogleAuthPage } from "@/pages/Auth/GoogleAuthPage";

export const AppRoutes = () => (
  <Routes>
    {/* Public pages */}
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
      path="/auth/register"
      element={
        <PublicRoute>
          <Identification />
        </PublicRoute>
      }
    />

    <Route
      path="/auth/forgotPassword"
      element={
        <PublicRoute>
          <ForgotPasswordPage />
        </PublicRoute>
      }
    />

    <Route
      path="/auth/resetPassword"
      element={
        <PublicRoute>
          <ResetPasswordPage />
        </PublicRoute>
      }
    />

    <Route
      path="/auth/google"
      element={
        <PublicRoute>
          <GoogleAuthPage />
        </PublicRoute>
      }
    />

    {UserRoutes()}
    {AdminRoutes()}

    {/* Catch-all 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
