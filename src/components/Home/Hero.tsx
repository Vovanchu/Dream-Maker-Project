import { useTranslation } from "@/hooks/useTranslation";
import HeroImg from "@/UI/Photo/DarkThemeBackgroundPhoto.jpeg";
import HeroImgLight from "@/UI/Photo/LightThemeBackgroundPhoto.jpeg";
import { useContext } from "react";
import { themes } from "@/const/colors";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import type { HeroStats } from "@/types/heroStats.type";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ThemeContext } from "@/Context/Theme/ThemeContext";

export const Hero = () => {
  const { theme } = useContext(ThemeContext);
  const t = useTranslation();

  const statsHero: HeroStats[] = [
    {
      label: t.hero.dreamsCompleted,
      value: "1,234",
    },
    {
      label: t.hero.donors,
      value: "567",
    },
    {
      label: t.hero.cities,
      value: "89",
    },
  ];

  return (
    <section
      className={cn(
        "relative min-h-screen py-20 pb-10 flex flex-col items-start justify-center text-foreground",
        "before:absolute before:inset-0 before:z-0 before:pointer-events-none",
        theme === themes.dark ? "before:bg-black/20" : "before:bg-white/5",
        "bg-cover bg-center",
      )}
      style={{
        backgroundImage: `url(${
          theme === themes.dark ? HeroImg : HeroImgLight
        })`,
      }}
    >
      <div className="max-w-3xl text-center flex flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-extrabold p-4 rounded-lg font-playfair">
          {t.hero.title}
        </h1>
        <p
          className={`max-w-lg text-xl ${
            theme === themes.dark ? "text-white" : "text-black"
          }`}
        >
          {t.hero.description}
        </p>

        <Button
          asChild
          className="inline-flex items-center justify-center px-2 lg:px-4 py-2 bg-primary text-primary-foreground font-medium shadow-md hover:bg-button-hover transition-colors duration-500"
        >
          <a href="#dreamCatalog">
            {t.hero.viewDreams}
            <ArrowDownwardOutlinedIcon
              sx={{
                fontSize: "1rem",
                marginLeft: "0.5rem",
              }}
            />
          </a>
        </Button>

        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center flex-wrap gap-4 my-4 sm:my-8">
          {statsHero.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 min-w-35 h-30 mx-auto sm:mx-4 p-4 rounded-[1vw] text-center bg-(--background) hover:transition-transform transform hover:scale-105 shadow-md cursor-default"
            >
              <p className="text-2xl sm:text-3xl font-bold text-(--primary)">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base text-(--muted-foreground)">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
