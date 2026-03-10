import { useTranslation } from "@/hooks/useTranslation";
import {
  Filter,
  type CategoryType,
  type FormatType,
} from "../../components/User/Filter";
import { useEffect, useState } from "react";
import { getDreams } from "@/api/services/dreams";
import type { DreamCatalog } from "@/types/dreams.type";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CatalogOfDreams = () => {
  const [dreams, setDreams] = useState<DreamCatalog>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryType>("all");
  const [format, setFormat] = useState<FormatType>("all");
  const [budget, setBudget] = useState([0, 10000]);

  const t = useTranslation();

  useEffect(() => {
    getDreams()
      .then((response) => {
        setDreams(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // filteredDreams — застосовуємо всі фільтри
  const filteredDreams = dreams.filter((dream) => {
    const matchesSearch =
      dream.title.toLowerCase().includes(search.toLowerCase()) ||
      dream.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || dream.person_type === category;
    const matchesFormat =
      format === "all" || dream.participation_format === format;

    const dreamBudget = Number(dream.target_budget);
    const matchesBudget = dreamBudget >= budget[0] && dreamBudget <= budget[1];

    return matchesSearch && matchesCategory && matchesFormat && matchesBudget;
  });

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDreams.map((dream) => (
          <Card
            key={dream.dream_id}
            className="hover:shadow-xl transition-shadow duration-200"
          >
            <CardHeader>
              <CardTitle>{dream.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p>{dream.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{dream.person_type}</Badge>
                <Badge variant="secondary">{dream.participation_format}</Badge>
                <Badge variant="secondary">
                  {dream.is_completed ? "Виконано" : "В процесі"}
                </Badge>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <span>Бюджет: {dream.target_budget} ₴</span>
              <span className="text-xs text-muted-foreground">
                Додано: {new Date(dream.created_at).toLocaleDateString()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
