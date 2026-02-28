import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTranslation } from "@/hooks/useTranslation";

export const Cta = () => {
  const t = useTranslation();

  return (
    <section id="dreamCatalog" className="py-20 bg-foreground text-background">
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <FavoriteIcon className="h-12 w-12 text-primary fill-primary mx-auto mb-6" />
        <h2 className="font-serif text-3xl font-bold md:text-4xl text-balance">
          {t.cta.title}
        </h2>
        <p className="mt-4 text-background/70 text-lg leading-relaxed text-pretty">
          {t.cta.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="text-base">
            <Link to="/dreams">{t.cta.viewDreams}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-base border-background/30 text-background hover:bg-background/10 hover:text-background"
          >
            <Link to="/register">{t.cta.register}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
