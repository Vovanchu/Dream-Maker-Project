import { useTranslation } from "@/hooks/useTranslation";

export const CatalogOfDreams = () => {
  const t = useTranslation();

  return (
    <div>
      <h1>{t.dreams.title}</h1>
    </div>
  );
};
