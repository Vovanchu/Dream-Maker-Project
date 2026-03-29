import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "../Context/Role/PublicRoute";
import NotFoundPage from "@/pages/NotFoundPage";
import { Identification } from "@/pages/Auth/Identification";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { HomeLayout } from "@/pages/Home/HomeLayout";
<<<<<<< HEAD
import { ForgotPasswordPage } from "@/pages/Auth/ForgotPassword";
import { ResetPasswordPage } from "@/pages/Auth/ResetPasswrod";
=======
import GoogleCallback from "@/pages/Auth/GoogleAuthPage";
>>>>>>> 4817390 (feat: add Google auth integration and fetch stats from API)

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

<<<<<<< HEAD
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
=======
    <Route path="/auth/google/callback" element={<GoogleCallback />} />
>>>>>>> 4817390 (feat: add Google auth integration and fetch stats from API)

    {UserRoutes()}
    {AdminRoutes()}

    {/* Catch-all 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
