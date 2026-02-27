import { ThemeProvider } from "./Context/Theme/ThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./Context/Role/UserProvider";
import { AppRoutes } from "./routes";
import { LanguageProvider } from "./Context/Lang/LangProvider";

function App() {
  console.log("App rendered");

  return (
    <LanguageProvider>
      <ThemeProvider>
        <UserProvider>
          <Router basename={"/Dream-Maker-Project/"}>
            <AppRoutes />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
