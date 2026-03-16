import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Filter } from "@/components/User/Filter";
import type {
  DreamCatalog,
  format_type,
  person_type,
} from "@/types/dreams.type";
import dreamsData from "@/const/dreams.json";
import { DreamGrid } from "@/components/User/Dreams/DreamGrid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const formattedDreams: DreamCatalog = dreamsData.map((d) => ({
  ...d,
  format: d.format as format_type,
  person_type: d.person_type as person_type,
}));

const ITEMS_PER_PAGE = 6;

export const CatalogOfDreams = () => {
  const [dreams] = useState<DreamCatalog>(formattedDreams);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<person_type>("all");
  const [format, setFormat] = useState<format_type>("all");
  const [budget, setBudget] = useState([0, 10000]);

  const t = useTranslation();

  const filteredDreams = dreams.filter((dream) => {
    return (
      (category === "all" || dream.person_type === category) &&
      (format === "all" || dream.format === format) &&
      dream.budget >= budget[0] &&
      dream.budget <= budget[1] &&
      (dream.dreamTitle.toLowerCase().includes(search.toLowerCase()) ||
        dream.dreamDescription.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const pages = Array.from(
    { length: Math.ceil(filteredDreams.length / ITEMS_PER_PAGE) },
    (_, i) =>
      filteredDreams.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE),
  );

  return (
    <div className="min-h-screen bg-background px-6 py-8 flex flex-col items-center">
      <h1 className="text-foreground font-playfair text-3xl md:text-4xl">
        {t.dreams.title}
      </h1>
      <p className="text-muted-foreground mt-2">{t.dreams.subtitle}</p>

      <Filter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        format={format}
        setFormat={setFormat}
        budget={budget}
        setBudget={setBudget}
      />

      {filteredDreams.length === 0 ? (
        <p className="text-muted-foreground mt-12 text-center">
          {t.dreams.notFound}
        </p>
      ) : (
        <Carousel
          className="w-full max-w-6xl mt-8"
          opts={{ align: "start", loop: false }}
        >
          <CarouselContent>
            {pages.map((pageDreams, pageIndex) => (
              <CarouselItem key={pageIndex}>
                <DreamGrid dreams={pageDreams} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {pages.length > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          )}
        </Carousel>
      )}
    </div>
  );
};
