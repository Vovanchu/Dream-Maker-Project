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
          to="/login"
          onClick={() => {
            logout();
          }}
        >
          <Button
            variant="outline"
            className="hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors duration-300"
          >
            <LogOut />
            {t.nav.logout}
          </Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button
            variant="outline"
            className="hover:bg-(--primary) hover:text-(--primary-foreground) transition-colors duration-300"
          >
            <LoginOutlinedIcon />
            {t.nav.login}
          </Button>
        </Link>
      )}
    </>
  );
};
