import { useTranslation } from "@/hooks/useTranslation";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

export const AuthCallback = () => {
  const { login } = useUser();
  const t = useTranslation();

  useEffect(() => {
    login();
  }, [login]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-accent-foreground-">
      <div className="flex flex-col items-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
        {/* Лоадер */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          {t.pages.googleAuth.title}
        </h1>

        <p className="text-gray-600 text-center max-w-xs">
          {t.pages.googleAuth.description}
        </p>
      </div>

      <footer className="absolute bottom-6 text-sm text-gray-500">
        {t.pages.googleAuth.footer.replace(
          "{year}",
          new Date().getFullYear().toString(),
        )}
      </footer>
    </div>
  );
};
