import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTranslation } from "@/hooks/useTranslation";

export const Logo = () => {
  const t = useTranslation();
  return (
    <a
      href="/"
      className="flex items-center gap-2 font-playfair font-semibold text-2xl md:text-3xl"
    >
      <FavoriteIcon sx={{ color: "var(--primary)" }} />
      {t.site.name}
    </a>
  );
};
