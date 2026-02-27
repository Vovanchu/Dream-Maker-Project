import { createContext } from "react";
import type { Language } from "../../i18n/index";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export default LanguageContext;
