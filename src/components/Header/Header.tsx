import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themes } from "@/const/colors";
import LanguageContext from "@/Context/Lang/LangConext";
import ThemeContext from "@/Context/Theme/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import type { Language } from "@/i18n";

import FavoriteIcon from "@mui/icons-material/Favorite";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { X } from "lucide-react";
import { clsx } from "clsx";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { selectedTheme, setSelectedTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const getClass = (code?: Language) =>
    clsx(
      "flex items-center gap-2 w-full rounded-md px-2 py-1 transition-colors duration-300 cursor-pointer",
      language === code && "font-bold text-[var(--primary)]",
      "hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]",
    );

  const navItems = [
    { label: t.nav.howItWorks, path: "#howItWorks" },
    { label: t.nav.dreamCatalog, path: "#dreamCatalog" },
    { label: t.nav.addDream, path: "#addDream" },
    { label: t.nav.statistics, path: "#statistics" },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-[var(--background)] text-[var(--foreground)] sticky top-0 z-50 shadow-md">
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
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                {selectedTheme === themes.light ? (
                  <LightModeOutlinedIcon />
                ) : (
                  <DarkModeOutlinedIcon />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[var(--background)] text-[var(--foreground)]"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSelectedTheme(themes.dark)}>
                  <DropdownMenuLabel className={getClass()}>
                    <DarkModeOutlinedIcon />
                    {t.theme.dark}
                  </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedTheme(themes.light)}
                >
                  <DropdownMenuLabel className={getClass()}>
                    <LightModeOutlinedIcon />
                    {t.theme.light}
                  </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <LanguageIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[var(--background)] text-[var(--foreground)]"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setLanguage("uk")}>
                  <DropdownMenuLabel className={getClass("uk")}>
                    UA Українська
                  </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  <DropdownMenuLabel className={getClass("en")}>
                    EN English
                  </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Login */}
          <Link to="/login">
            <Button
              variant="outline"
              className="hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors duration-300"
            >
              <LoginOutlinedIcon />
              {t.nav.login}
            </Button>
          </Link>
        </div>

        {/* Mobile Burger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X size={26} /> : <MenuOutlinedIcon />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full bg-[var(--background)] shadow-lg z-40 flex flex-col items-center gap-6 py-8">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="flex flex-col gap-4 mt-4">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button
                variant="outline"
                className="hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
              >
                <LoginOutlinedIcon />
                {t.nav.login}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
