import { useContext } from "react";
import { translations } from "../i18n";
import { LanguageContext } from "@/Context/Lang/LangConext";

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  return translations[language];
};
