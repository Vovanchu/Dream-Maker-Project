// DashboardPage.tsx

import Header from "@/components/Header/Header";
import { CatalogOfDreams } from "@/components/User/CatalogsOfDream";
import { useUser } from "@/hooks/useUser";

export const DashboardPage = () => {
  const { role } = useUser();

  return (
    <div>
      <Header />
      {role === "admin" ? <AdminContent /> : <UserContent />}
    </div>
  );
};

const AdminContent = () => <div>Адмінська панель</div>;
const UserContent = () => <CatalogOfDreams />;
