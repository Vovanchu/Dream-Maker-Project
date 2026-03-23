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
import { useContext } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { clsx } from "clsx";
import { useTranslation } from "@/hooks/useTranslation";
import { ThemeContext } from "@/Context/Theme/ThemeContext";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const t = useTranslation();

  const getClass = (code?: string) =>
    clsx(
      "flex items-center gap-2 w-full rounded-md px-2 py-1 transition-colors duration-300 cursor-pointer",
      theme === code && "font-bold text-ring",
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="link"
          className="cursor-pointer text-foreground border border-transparent rounded-md transition-all duration-300 hover:border-gray-400 hover:bg-accent"
        >
          {theme === themes.light ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-(--background) text-(--foreground)"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setTheme(themes.dark)}>
            <DropdownMenuLabel className={getClass("dark")}>
              <DarkModeOutlinedIcon />
              {t.theme.dark}
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme(themes.light)}>
            <DropdownMenuLabel className={getClass("light")}>
              <LightModeOutlinedIcon />
              {t.theme.light}
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
