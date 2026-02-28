import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTranslation } from "@/hooks/useTranslation";
import HeroImg from "@/UI/Photo/backgroung-image.png";
import { useContext } from "react";
import { themes } from "@/const/colors";
import ThemeContext from "@/Context/Theme/ThemeContext";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import type { HeroStats } from "@/types/heroStats.type";

export const Hero = () => {
  const { selectedTheme } = useContext(ThemeContext);
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
    <div
      className="min-h-screen flex flex-col items-center justify-center text-(--foreground)"
      style={{
        backgroundImage: `linear-gradient(${
          selectedTheme === themes.dark
            ? "rgba(0, 0, 0, 0.6)"
            : "rgba(140, 95, 15, 0.65)"
        }), url(${HeroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-3xl text-center flex flex-col items-center justify-center gap-6">
        <div className="flex flex-row items-center gap-2 p-2 bg-[#6b4d0a] text-(--ring) rounded-full shadow-lg">
          <FavoriteIcon sx={{ color: "var(--ring)", fontSize: "1rem" }} />
          <p className="text-sm">{t.site.badge}</p>
        </div>

        <h1 className="text-5xl font-extrabold p-4 rounded-lg font-playfair">
          {t.hero.title}
        </h1>
        <p
          className={`max-w-2lg text-lg font-bold ${
            selectedTheme === themes.dark ? "text-white" : "text-black"
          }`}
        >
          {t.hero.description}
        </p>

        <div className="flex flex-row gap-2 m-2">
          <a
            href={"#dreamCatalog"}
            className="inline-block px-2 lg:px-4 py-2 items-center justify-center bg-(--primary) text-(--primary-foreground) rounded-xl lg:rounded-[2vw] font-medium shadow-md duration-500 hover:bg-(--button-hover) transition-colors"
          >
            {t.hero.viewDreams}
            <ArrowDownwardOutlinedIcon
              sx={{
                fontSize: "1rem",
                marginLeft: "0.5rem",
              }}
            />
          </a>

          <a
            href={"#add-dream"}
            className="inline-block px-2 lg:px-4 py-2 items-center justify-center bg-(--primary) text-(--primary-foreground) rounded-xl lg:rounded-[2vw] font-medium shadow-md duration-500 hover:bg-(--button-hover) transition-colors"
          >
            {t.hero.addDream}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center flex-wrap gap-4 my-4 sm:my-8">
          {statsHero.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 min-w-30 sm:min-w-37.5 mx-auto sm:mx-4 p-4 rounded-[1vw] text-center bg-(--background) hover:transition-transform transform hover:scale-105 shadow-md cursor-default"
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
    </div>
  );
};
