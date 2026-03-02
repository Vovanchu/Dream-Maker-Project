import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageContext from "@/Context/Lang/LangConext";
import { useContext } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { clsx } from "clsx";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const getClass = (code?: string) =>
    clsx(
      "flex items-center gap-2 w-full rounded-md px-2 py-1 transition-colors duration-300 cursor-pointer",
      language === code && "font-bold text-ring",
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="link" className="cursor-pointer text-foreground">
          <LanguageIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-(--background) text-(--foreground)"
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
