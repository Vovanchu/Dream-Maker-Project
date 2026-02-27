// DashboardPage.tsx

import { useUser } from "@/hooks/useUser";

export const DashboardPage = () => {
  const { role } = useUser();

  return (
    <div>
      <h1>Dashboard</h1>
      {role === "admin" ? <AdminContent /> : <UserContent />}
    </div>
  );
};

const AdminContent = () => <div>Адмінська панель</div>;
const UserContent = () => <div>Користувацька панель</div>;
