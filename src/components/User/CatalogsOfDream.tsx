import { useTranslation } from "@/hooks/useTranslation";
import {
  Filter,
  type CategoryType,
  type FormatType,
} from "./components/Filter";
import { useState } from "react";

import { dreams } from "@/const/dreams";

export const CatalogOfDreams = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryType>("all");
  const [format, setFormat] = useState<FormatType>("all");
  const [budget, setBudget] = useState([0, 10000]);

  const t = useTranslation();

  return (
    <div className="h-screen bg-background">
      <h1 className="text-foreground font-playfair">{t.dreams.title}</h1>
      <p className="text-muted-foreground">{t.dreams.subtitle}</p>

      <Filter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        format={format}
        setFormat={setFormat}
        setBudget={setBudget}
        budget={budget}
      />

      <div>
        {dreams.map((dream) => (
          <div key={dream.dream_id}>
            <h2>{dream.title}</h2>
            <p>{dream.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
