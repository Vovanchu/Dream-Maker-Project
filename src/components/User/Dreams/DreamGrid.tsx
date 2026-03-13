import type { Dream } from "@/types/dreams.type";
import { DreamCard } from "./DreamCard";

interface DreamGridProps {
  dreams: Dream[];
}

export const DreamGrid = ({ dreams }: DreamGridProps) => {
  if (!dreams.length) {
    return <p className="text-muted-foreground mt-6">Мрії не знайдено</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {dreams.map((dream) => (
        <DreamCard key={dream.dream_id} dream={dream} />
      ))}
    </div>
  );
};
