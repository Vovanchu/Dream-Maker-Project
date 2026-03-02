import { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { X } from "lucide-react";

import { useTranslation } from "@/hooks/useTranslation";
import type { navigationItem } from "@/types/navItems.type";
import { LogInOut } from "./components/LogInOut";
import { MobileMenu } from "./components/MobileMenu";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const navItems: navigationItem[] = [
    { label: t.nav.howItWorks, path: "#howItWorks" },
    { label: t.nav.dreamCatalog, path: "#dreamCatalog" },
    { label: t.nav.statistics, path: "#statistics" },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-(--background) text-(--foreground) sticky top-0 z-50 shadow-md">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 font-playfair font-semibold text-2xl md:text-3xl"
        >
          <FavoriteIcon sx={{ color: "var(--primary)" }} />
          {t.site.name}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="text-sm font-medium text-(--muted-foreground) hover:text-(--primary) transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeSwitcher />

          <LanguageSwitcher />

          <LogInOut />
        </div>

        {/* Mobile Burger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X size={26} /> : <MenuOutlinedIcon />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isOpen && <MobileMenu setIsOpen={setIsOpen} navItems={navItems} />}
    </>
  );
};

export default Header;
