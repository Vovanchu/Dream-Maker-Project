import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Filter } from "@/components/User/Filter";
import type { DreamCatalog, FormatType, PersonType } from "@/types/dreams.type";
import dreamsData from "@/const/dreams.json";
import { DreamGrid } from "@/components/User/Dreams/DreamGrid";

const formattedDreams: DreamCatalog = dreamsData.map((d) => ({
  ...d,
  format: d.format as FormatType,
  person_type: d.person_type as PersonType,
}));

export const CatalogOfDreams = () => {
  const [dreams] = useState<DreamCatalog>(formattedDreams);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PersonType>("all");
  const [format, setFormat] = useState<FormatType>("all");
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

  return (
    <div className="min-h-screen bg-background px-6 py-8 flex flex-col items-center justify-center">
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

      <DreamGrid dreams={filteredDreams} />
    </div>
  );
};
