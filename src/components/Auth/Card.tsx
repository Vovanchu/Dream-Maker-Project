import { GoogleIcon } from "@/assets/icon/gogleIcon";
import { LoginForm } from "@/components/Auth/LoginForm";
import { RegisterForm } from "@/components/Auth/RegisterForm";
import { useTranslation } from "@/hooks/useTranslation";

import { Link } from "react-router-dom";

export const Card = () => {
  const t = useTranslation();

  const url = window.location.href.includes("login");

  return (
    <>
      {/* Login/Register Card */}
      <div className="bg-card text-card-foreground flex flex-col gap-6 w-full max-w-md rounded-xl border p-8 shadow-lg sm:p-10">
        {/* Title */}
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl text-foreground sm:text-2xl font-semibold">
            {url ? t.login.title : t.register.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {url ? t.login.subtitle : t.register.subtitle}
          </p>
        </div>

        {url ? <LoginForm /> : <RegisterForm />}

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground uppercase tracking-wider">
            {t.login.or}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google login */}
        <button
          type="button"
          className="w-full text-foreground flex items-center justify-center gap-3 rounded-md border border-border px-4 py-2 hover:bg-muted transition-colors duration-200"
        >
          <GoogleIcon />
          {t.login.google}
        </button>

        {/* Registration */}
        {url ? (
          <p className="text-center text-sm text-muted-foreground mt-3">
            {t.login.noAccount}{" "}
            <Link to="/register" className="text-primary hover:underline">
              {t.login.register}
            </Link>
          </p>
        ) : null}
      </div>
    </>
  );
};
