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

  const sortedDreams = [...dreams].sort((a, b) => {
    if (a.is_completed !== b.is_completed) {
      return Number(a.is_completed) - Number(b.is_completed);
    }

    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {sortedDreams.map((dream) => (
        <DreamCard
          key={dream.dream_id}
          dream={dream}
          handleCompleteClick={handleCompleteClick}
        />
      ))}
    </div>
  );
};
