"use client";

import { Heart, Link } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const t = useTranslation();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <Heart className="h-6 w-6 text-primary fill-primary" />
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
                <Link
                  href="/#how-it-works"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.howItWorks}
                </Link>
              </li>
              <li>
                <Link
                  href="/dreams"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.dreamCatalog}
                </Link>
              </li>
              <li>
                <Link
                  href="/add-dream"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.addDream}
                </Link>
              </li>
              <li>
                <Link
                  href="/#stats"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.statistics}
                </Link>
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
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.login}
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.nav.register}
                </Link>
              </li>
              <li>
                <Link
                  href="/reset-password"
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
            <Heart className="inline h-3 w-3 text-primary fill-primary" />{" "}
            {t.site.inUkraine}
          </p>
        </div>
      </div>
    </footer>
  );
}
