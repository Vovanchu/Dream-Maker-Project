import { ResetPasswordForm } from "@/components/Auth/ResetPasswordForm";
import { LanguageSwitcher } from "@/components/Header/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/Header/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeftFromLine, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ResetPasswordPage = () => {
  const t = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-8 bg-muted px-4 py-8 sm:px-6 lg:px-8">
      {/* Top */}
      <div className="flex flex-row sm:items-center sm:justify-between w-full max-w-md gap-4">
        <Button
          type="button"
          onClick={() => navigate("/auth/login")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeftFromLine className="w-5 h-5" />
          {t.forms.buttons.back || "Back"}
        </Button>

        <div className="flex items-center gap-4 justify-end">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Logo */}
      <div className="flex flex-row items-center gap-3 text-foreground font-bold font-playfair text-2xl sm:text-3xl">
        <Heart className="w-8 h-8 fill-accent stroke-accent" />
        <h1>{t.site.name}</h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap justify-center items-center gap-1 text-sm text-muted-foreground mt-6">
        <span>{new Date().getFullYear()}</span>
        <span className="hidden sm:inline">&middot;</span>
        <span>{t.site.name}</span>
        <span className="hidden sm:inline">&middot;</span>
        <span>{t.site.copyright}</span>
      </footer>
    </div>
  );
};
