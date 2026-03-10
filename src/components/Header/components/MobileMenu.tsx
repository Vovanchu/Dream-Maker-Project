import type { navigationItem } from "@/types/navItems.type";
import { LogInOut } from "./LogInOut";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface MobileMenuProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: navigationItem[];
}

export const MobileMenu = ({ setIsOpen, navItems }: MobileMenuProps) => {
  return (
    <>
      <div className="md:hidden fixed top-18 left-0 w-full h-[calc(100vh-4.5rem)] bg-background shadow-lg z-40 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="shrink-0 flex items-center justify-between w-full px-6 pb-8">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <LogInOut />
        </div>
      </div>
    </>
  );
};
