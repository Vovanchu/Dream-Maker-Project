// AdminRoutes.tsx
import { Route } from "react-router-dom";
import { ProtectedRoute } from "../Context/Role/ProtectedRoute";

export const AdminRoutes = (
  <>
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <h1>Hello Admin</h1>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <h1>Admin Users Page</h1>
        </ProtectedRoute>
      }
    />
  </>
);
