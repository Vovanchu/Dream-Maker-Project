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
      <div className="md:hidden h-screen fixed top-18 left-0 w-full bg-(--background) shadow-lg z-40 flex flex-col items-center gap-6 py-8">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-(--foreground) hover:text-(--primary) transition-colors"
          >
            {item.label}
          </a>
        ))}

        <div className="flex gap-2">
          <ThemeSwitcher />

          <LanguageSwitcher />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <LogInOut />
        </div>
      </div>
      ;
    </>
  );
};
