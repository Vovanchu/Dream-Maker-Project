import type { Dream } from "@/types/dreams.type";
import { DreamCard } from "./DreamCard";
import { useTranslation } from "@/hooks/useTranslation";

interface IDreamGridProps {
  dreams: Dream[];
  handleCompleteClick: (dreamId: string) => void;
}

export const DreamGrid = ({ dreams, handleCompleteClick }: IDreamGridProps) => {
  const t = useTranslation();

  if (!dreams.length) {
    return <p className="text-muted-foreground mt-6">{t.dreams.notFound}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {dreams.map((dream) => (
        <DreamCard
          key={dream.dream_id}
          dream={dream}
          handleCompleteClick={handleCompleteClick}
        />
      ))}
    </div>
  );
};
