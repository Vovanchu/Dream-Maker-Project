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
import { useUser } from "@/hooks/useUser";
import { Button } from "../ui/button";
import { useNavClick } from "@/hooks/useNavClick";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useUser();
  const t = useTranslation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const guestNavItems: navigationItem[] = [
    { label: t.nav.howItWorks, path: "#howItWorks" },
    { label: t.nav.dreamCatalog, path: "#dreamCatalog" },
    { label: t.nav.statistics, path: "#statistics" },
  ];

  const userNavItems: navigationItem[] = [
    { label: t.nav.myDreams, path: "/user/dreams" },
    { label: t.nav.addDream, path: "/user/add-dream" },
    { label: t.nav.statistics, path: "#statistics" },
  ];

  const navItems = role ? userNavItems : guestNavItems;

  const { handleNavClick } = useNavClick(setIsOpen);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-(--background) text-(--foreground) sticky top-0 z-50 shadow-md">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-playfair font-semibold text-2xl md:text-3xl"
        >
          <FavoriteIcon sx={{ color: "var(--primary)" }} />
          {t.site.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className="text-sm font-medium transition-colors duration-300 cursor-pointer"
            >
              {item.label}
            </Button>
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
      {isOpen && (
        <MobileMenu
          setIsOpen={setIsOpen}
          navItems={navItems}
          handleNavClick={handleNavClick}
        />
      )}
    </>
  );
};

export default Header;
