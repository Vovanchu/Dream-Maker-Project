import { Card } from "@/components/Auth/Card";
import { LanguageSwitcher } from "@/components/Header/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/Header/components/ThemeSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { Heart } from "lucide-react";

export const Identification = () => {
  const t = useTranslation();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-8 bg-muted px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Switchers */}
      <div className="flex flex-row gap-4 self-end sm:self-auto">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      {/* Logo */}
      <div className="flex flex-row items-center gap-3 text-foreground font-bold font-playfair text-2xl sm:text-3xl">
        <Heart className="w-8 h-8 fill-accent stroke-accent" />
        <h1>{t.site.name}</h1>
      </div>

      <Card />

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
