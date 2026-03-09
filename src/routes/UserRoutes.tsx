import { Route } from "react-router-dom";
import { ProtectedRoute } from "../Context/Role/ProtectedRoute";
import { HomePage } from "@/pages/Home/HomePage";
import { CatalogOfDreams } from "@/pages/Users/CatalogsOfDream";
import { AddDreamPage } from "@/pages/Users/AddDream";

export const UserRoutes = (
  <>
    <Route
      path="/user"
      element={
        <ProtectedRoute allowedRoles={["user"]}>
          <HomePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/dreams"
      element={
        <ProtectedRoute allowedRoles={["user"]}>
          <CatalogOfDreams />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/add-dream"
      element={
        <ProtectedRoute allowedRoles={["user"]}>
          <AddDreamPage />
        </ProtectedRoute>
      }
    />
  </>
);
