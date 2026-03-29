import { GoogleIcon } from "@/assets/gogleIcon";
import { LoginForm } from "@/components/Auth/LoginForm";
import { RegisterForm } from "@/components/Auth/RegisterForm";
import { useTranslation } from "@/hooks/useTranslation";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

export const Card = () => {
  const t = useTranslation();
  const { pathname } = useLocation();

  const isLogin = pathname.includes("login");

  const handleGoogleLogin = () => {
    console.log("Initiating Google login...");
    window.open(`${import.meta.env.VITE_API_URL}/auth/google`, "_self");
  };

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 w-full max-w-md rounded-xl border p-8 shadow-lg sm:p-10">
      {/* Title */}
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-xl text-foreground sm:text-2xl font-semibold">
          {isLogin ? t.pages.login.title : t.pages.register.title}
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground">
          {isLogin ? t.pages.login.subtitle : t.pages.register.subtitle}
        </p>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}

      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="h-px flex-1 bg-border" />

        <span className="text-sm text-muted-foreground uppercase tracking-wider">
          {t.pages.login.or}
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google login */}
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-3 cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon />
        {t.pages.login.google}
      </Button>

      {/* Registration */}
      {isLogin && (
        <p className="text-center text-sm text-muted-foreground mt-3">
          {t.pages.login.noAccount}{" "}
          <Link to="/auth/register" className="text-primary hover:underline">
            {t.pages.login.register}
          </Link>
        </p>
      )}
    </div>
  );
};
