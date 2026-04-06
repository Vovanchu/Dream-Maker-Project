/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const { login, role } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      await login();
    };
    handleLogin();
  }, []);

  useEffect(() => {
    if (role) {
      navigate(role === "admin" ? "/admin" : "/dashboard");
    }
  }, [role]);

  return <p className="text-center mt-12">Logging in with Google...</p>;
}
import { GoogleIcon } from "@/assets/gogleIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";

export const GoogleAuthPage = () => {
  const t = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="max-w-md w-full text-center bg-card border rounded-xl p-8 shadow-lg">
        <div className="flex justify-center mb-4">
          <GoogleIcon />
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-3">
          {t.pages.googleAuth.title}
        </h1>

        <p className="text-muted-foreground text-sm mb-6">
          {t.pages.googleAuth.description}
        </p>

        <p className="text-xs text-muted-foreground mb-6">
          {t.pages.googleAuth.progress}
        </p>

        <Link
          to="/auth/login"
          className="w-full text-foreground flex items-center justify-center gap-3 rounded-md border border-border px-4 py-2 hover:bg-muted transition-colors duration-200"
        >
          {t.pages.googleAuth.back}
        </Link>
      </div>
    </div>
  );
};
