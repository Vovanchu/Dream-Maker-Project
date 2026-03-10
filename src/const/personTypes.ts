import type { useTranslation } from "@/hooks/useTranslation";

export type PersonTypes = {
  value: string;
  label: string;
};

export const getPersonType = (
  t: ReturnType<typeof useTranslation>,
): PersonTypes[] => [
  { value: "child", label: t.categories.child },
  { value: "elderly", label: t.categories.elderly },
  { value: "veteran", label: t.categories.veteran },
  { value: "disabled", label: t.categories.disabled },
];
