import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Filter } from "@/components/User/Filter";
import type {
  DreamCatalog,
  format_type,
  person_type,
} from "@/types/dreams.type";
import { DreamGrid } from "@/components/User/Dreams/DreamGrid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { completeDream, getDreams } from "@/api/services/dreams";
import { Loader } from "lucide-react";
import Swal from "sweetalert2";
import { getErrorMessage } from "@/utils/errorMessage";

const ITEMS_PER_PAGE = 6;

export const CatalogOfDreams = () => {
  const [dreams, setDreams] = useState<DreamCatalog>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<person_type>("all");
  const [format, setFormat] = useState<format_type>("all");
  const [budget, setBudget] = useState([0, 10000]);

  const [loading, setLoading] = useState<boolean>(false);

  const t = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getDreams();
        setDreams(data);
      } catch (err) {
        const message = getErrorMessage(err, t.pages.dreams.completeErrorText);

        Swal.fire({
          icon: "error",
          title: t.pages.dreams.completeErrorTitle,
          text: message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  const filteredDreams = dreams.filter((dream) => {
    const matchesCategory =
      category === "all" || dream.person_type === category;

    const matchesFormat =
      format === "all" || dream.participation_format === format;

    const matchesBudget =
      dream.target_budget >= budget[0] && dream.target_budget <= budget[1];

    const matchesSearch =
      !search ||
      dream.title.toLowerCase().includes(search.toLowerCase()) ||
      dream.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesFormat && matchesBudget && matchesSearch;
  });

  const pages = Array.from(
    { length: Math.ceil(filteredDreams.length / ITEMS_PER_PAGE) },
    (_, i) =>
      filteredDreams.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE),
  );

  const handleCompleteClick = async (dreamId: string) => {
    try {
      await completeDream(dreamId);

      Swal.fire({
        title: t.pages.dreams.completeSuccessTitle,
        text: t.pages.dreams.completeSuccessText,
        icon: "success",
        confirmButtonText: t.forms.buttons.cancel,
      });

      const data = await getDreams();
      setDreams(data);
    } catch (err) {
      const message = getErrorMessage(err, t.pages.dreams.completeErrorText);

      Swal.fire({
        title: t.pages.dreams.completeErrorTitle,
        text: message,
        icon: "error",
        confirmButtonText: t.forms.buttons.cancel,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loader />;
  }

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
                <DreamGrid
                  dreams={pageDreams}
                  handleCompleteClick={handleCompleteClick}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {pages.length > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious className="static translate-y-0 text-muted-foreground cursor-pointer" />
              <CarouselNext className="static translate-y-0 text-muted-foreground cursor-pointer" />
            </div>
          )}
        </Carousel>
      )}
    </div>
  );
};
