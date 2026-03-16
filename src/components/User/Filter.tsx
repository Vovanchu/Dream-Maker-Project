import { useTranslation } from "@/hooks/useTranslation";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { format_type, person_type } from "@/types/dreams.type";

interface FilterProps {
  search: string;
  setSearch: (value: string) => void;
  category: person_type;
  setCategory: (value: person_type) => void;
  format: format_type;
  setFormat: (value: format_type) => void;
  budget: number[];
  setBudget: (value: number[]) => void;
}

interface IPersonFilter {
  id: person_type;
  label: string;
}

interface IFormatFilter {
  id: format_type;
  label: string;
}

export const Filter = ({
  search,
  setSearch,
  category,
  setCategory,
  format,
  setFormat,
  budget,
  setBudget,
}: FilterProps) => {
  const t = useTranslation();

  const categories: IPersonFilter[] = [
    { id: "all", label: t.dreams.all },
    { id: "child", label: t.cat.child },
    { id: "elderly", label: t.cat.elderly },
    { id: "veteran", label: t.cat.veteran },
    { id: "disabled", label: t.cat.disabled },
  ];

  const formats: IFormatFilter[] = [
    { id: "all", label: t.dreams.all },
    { id: "online", label: t.fmt.online },
    { id: "offline", label: t.fmt.offline },
  ];

  return (
    <section className="flex flex-col gap-6 p-4 w-full max-w-4xl mx-auto bg-card">
      <div className="w-full">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t.dreams.format}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-6 gap-4 justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground font-montserrat">
            {t.dreams.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((categorie) => (
              <button
                key={categorie.id}
                onClick={() => setCategory(categorie.id)}
                className={`px-3 py-1 rounded-full border-black ${
                  category === categorie.id
                    ? "bg-accent text-white"
                    : "bg-white text-gray-700"
                } text-sm transition-colors cursor-pointer`}
              >
                {categorie.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground font-montserrat">
            {t.dreams.format}
          </h3>
          <div className="flex flex-wrap gap-2">
            {formats.map((formatItem) => (
              <button
                key={formatItem.id}
                onClick={() => setFormat(formatItem.id)}
                className={`px-3 py-1 rounded-full border-black ${
                  format === formatItem.id
                    ? "bg-accent text-white"
                    : "bg-white text-gray-700"
                } text-sm transition-colors cursor-pointer`}
              >
                {formatItem.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <Label
          className="text-sm font-semibold mb-2 text-muted-foreground font-montserrat"
          htmlFor="slider-demo-budget"
        >
          {t.dreams.budget}: ₴{budget[0]} - ₴{budget[1]}
        </Label>
        <Slider
          id="slider-demo-budget"
          value={budget}
          onValueChange={(budget) => setBudget(budget as number[])}
          min={0}
          max={10000}
          step={500}
          className="w-full"
        />
      </div>
    </section>
  );
};
