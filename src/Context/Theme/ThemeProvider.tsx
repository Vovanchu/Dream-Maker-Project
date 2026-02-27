import { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";
import { themes } from "../../const/colors";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState(themes.light);

  useEffect(() => {
    const root = document.documentElement;

    if (selectedTheme === themes.dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
