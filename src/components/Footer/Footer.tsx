"use client";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import FavoriteIcon from "@mui/icons-material/Favorite";

export function Footer() {
  const t = useTranslation();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 group">
              <FavoriteIcon className="h-6 w-6 text-primary fill-primary" />
              <span className="font-serif text-lg font-bold text-foreground">
                {t.site.name}
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t.cta.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t.nav.navigation}
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#howItWorks"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a
                  href="#dreamCatalog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.dreamCatalog}
                </a>
              </li>
              <li>
                <a
                  href="#statistics"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.statistics}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t.nav.account}
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/auth/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.login}
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.register}
                </Link>
              </li>
              <li>
                <Link
                  to="/reset-password"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.resetPassword}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t.site.name}. {t.site.copyright}
          </p>
          <p className="text-xs text-muted-foreground">
            {t.site.madeWith}{" "}
            <FavoriteIcon className="inline h-3 w-3 text-primary fill-primary" />{" "}
            {t.site.inUkraine}
          </p>
        </div>
      </div>
    </footer>
  );
}
