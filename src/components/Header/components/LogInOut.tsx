import { Button } from "@/components/ui/button";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useTranslation } from "@/hooks/useTranslation";
import { useUser } from "@/hooks/useUser";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const LogInOut = () => {
  const t = useTranslation();
  const { role, logout } = useUser();

  return (
    <>
      {role ? (
        <Link
          to="/auth/login"
          onClick={() => {
            logout();
          }}
        >
          <Button
            variant="outline"
            className="text-(--foreground) hover:text-(--primary) transition-colors duration-300 cursor-pointer"
          >
            <LogOut />
            {t.nav.logout}
          </Button>
        </Link>
      ) : (
        <Link to="/auth/login">
          <Button
            variant="outline"
            className="text-(--foreground) hover:bg-(--primary) hover:text-(--primary) transition-colors duration-300 cursor-pointer"
          >
            <LoginOutlinedIcon />
            {t.nav.login}
          </Button>
        </Link>
      )}
    </>
  );
};
