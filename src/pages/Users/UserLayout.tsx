// UserLayout.tsx
import { Footer } from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ProtectedRoute } from "@/Context/Role/ProtectedRoute";
import { Outlet } from "react-router-dom";

export const UserLayout = () => (
  <ProtectedRoute allowedRoles={["user"]}>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </ProtectedRoute>
);
