import { ThemeProvider } from "./Context/Theme/ThemeProvider";
import { UserProvider } from "./Context/Role/UserProvider";
import { AppRoutes } from "./routes";
import { LanguageProvider } from "./Context/Lang/LangProvider";

function App() {
  console.log("app");
  return (
    <LanguageProvider>
      <ThemeProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
