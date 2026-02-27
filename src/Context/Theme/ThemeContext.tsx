import React from "react";
import { themes } from "../../const/colors";

interface ThemeContextType {
  selectedTheme: typeof themes.light | typeof themes.dark;
  setSelectedTheme: (theme: typeof themes.light | typeof themes.dark) => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  selectedTheme: themes.light,
  setSelectedTheme: () => {},
});

export default ThemeContext;
