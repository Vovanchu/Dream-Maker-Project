"use client";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import { getNavItems } from "../utils/navigation";
import { useNavigationHandler } from "@/hooks/useNavigation";

export function Footer() {
  const t = useTranslation();
  const { role } = useUser();

  let navItems;

  if (role) {
    navItems = getNavItems(t, true);
  } else {
    navItems = getNavItems(t, false);
  }

  const { handleNavClick } = useNavigationHandler();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <a href="#" className="flex items-center gap-2 group">
              <FavoriteIcon className="h-6 w-6 text-primary fill-primary" />
              <span className="font-serif text-lg font-bold text-foreground">
                {t.site.name}
              </span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t.cta.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t.nav.navigation}
            </h3>
            {/* Desktop Navigation */}
            <nav className="flex flex-col items-start">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer bg-transparent hover:bg-transparent m-0 p-0"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
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
