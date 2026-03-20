// DreamCard.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Dream } from "@/types/dreams.type";
import { useTranslation } from "@/hooks/useTranslation";

interface IDreamCardProps {
  dream: Dream;
}

export const DreamCard = ({ dream }: IDreamCardProps) => {
  const t = useTranslation();

  const collected = Math.floor(dream.target_budget * 0.72);
  const progress = Math.floor((collected / dream.target_budget) * 100);

  return (
    <Card className="overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl transition-all">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={dream.image_url}
          alt={dream.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-blue-100 text-blue-700">
            {dream.person_type}
          </Badge>
          <Badge className="bg-black/70 text-white">
            {dream.participation_format}
          </Badge>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{dream.title}</h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {dream.description}
        </p>

        <div className="text-xs text-muted-foreground flex gap-4">
          <span>{dream.city}</span>
          <span>{new Date(dream.created_at).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {collected.toLocaleString()} /{" "}
            {dream.target_budget.toLocaleString()} грн
          </span>
          <span className="font-medium">{progress}%</span>
        </div>

        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
        </div>

        <Button className="w-full bg-ring text-primary-foreground hover:bg-primary/90 cursor-pointer">
          {t.forms.buttons.make}
        </Button>
      </div>
    </Card>
  );
};
