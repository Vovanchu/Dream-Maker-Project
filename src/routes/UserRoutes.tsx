// UserRoutes.tsx
import { Route } from "react-router-dom";
import { HomePage } from "@/pages/Home/HomePage";
import { CatalogOfDreams } from "@/pages/Users/CatalogsOfDream";
import { AddDreamPage } from "@/pages/Users/AddDream";
import { UserLayout } from "@/pages/Users/UserLayout";

export const UserRoutes = () => (
  <Route path="/user" element={<UserLayout />}>
    <Route index element={<HomePage />} />
    <Route path="dreams" element={<CatalogOfDreams />} />
    <Route path="add-dream" element={<AddDreamPage />} />
  </Route>
);
